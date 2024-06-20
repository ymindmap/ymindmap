/**
 * zoom的实现
 * 核心逻辑来自
 * @see https://www.npmjs.com/package/viewerjs
 */
import { fabric } from 'fabric';
import { debounce, throttle } from 'lodash-es';
import { getElement } from '../dom'
import type { Board } from '@ymindmap/core'


type DocumentEventMap = Map<string, {
    handler: (e: Event) => void,
    options?: {
        passive?: boolean
        capture?: boolean,
    }
}>;
const EVENT_KEY = '__document_event__';
const ZOOM_RATE = 10;
const CANVAS_ACTIVE_KEY = '__active__'

// 阻尼函数
function damping(source: number, sourceMax: number, rate: number = 100) {
    const max = sourceMax * rate;
    const x = source * rate;
    const y = 0.82231 * max / (1 + 4338.47 / Math.pow(Math.abs(x), 1.14791));
    return Math.floor(Math.round(x < 0 ? -y : y) / rate);
}

export function bindEvent(canvas: fabric.Canvas, options: { minZoom: number, maxZoom: number, board?: Board }) {
    // 校验
    const zoomWithDamping = throttle((targetScale: number) => {
        if (Math.floor(targetScale * 100) === Math.floor(canvas.getZoom() * 100)) return;
        const delta = Math.max(damping(ZOOM_RATE, (canvas.getZoom() - targetScale) * 100) / 100, 0.01);

        requestAnimationFrame(() => {
            canvas.setZoom(canvas.getZoom() + (targetScale > canvas.getZoom() ? delta : -delta));
            zoomWithDamping(targetScale);
        })
    }, 24)
    const valideAndReZoom = debounce(() => {
        const scale = Math.max(options.minZoom, Math.min(canvas.getZoom(), options.maxZoom));
        if (scale !== canvas.getZoom()) zoomWithDamping(scale);
        autoScrollIntoview();
    }, 1000)

    const autoScrollIntoview = debounce(() => {
        // 判断canvas的所有元素是否都不可见
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const objects = canvas.getObjects();
        const isAllInView = objects.every((item) => {
            const { left, top, width, height } = item.getBoundingRect();
            return left >= -width
                && left <= canvasWidth
                && top >= -height
                && top <= canvasHeight
        })
        // 需要缓存最近的变换距离升级算法
        if (!isAllInView) {
            canvas.viewportCenterObject(objects[0]);
        }
    }, 1000)

    // canvas是否聚焦基于鼠标
    canvas.on('mouse:over', () => Reflect.set(canvas, CANVAS_ACTIVE_KEY, true));
    canvas.on('mouse:out', () => Reflect.set(canvas, CANVAS_ACTIVE_KEY, false));

    // eslint-disable-next-line 
    const container: HTMLDivElement = (canvas as any).wrapperEl;

    const eventsMap: DocumentEventMap = new Map();
    Reflect.set(canvas, EVENT_KEY, eventsMap);
    // 绑定对应的事件实现缩放效果

    // 绑定keydown目前不生效，触发的对象一直是body，需要修复
    eventsMap.set('keydown', {
        handler: (e: Event) => {
            if (!Reflect.get(canvas, CANVAS_ACTIVE_KEY)) return;
            const event = e as KeyboardEvent;
            // ctrl +- 改为正常缩放
            if (event.ctrlKey || event.metaKey) {
                // +在 ctrl 下会变成 =
                if (event.key === '+' || event.key === '-' || event.key === '=') {
                    zoomWithDamping.cancel();
                    event.preventDefault();
                    event.stopPropagation();
                    canvas.setZoom(canvas.getZoom() + ZOOM_RATE * (event.key === '-' ? -0.01 : 0.01));
                    valideAndReZoom();
                }
            }
            if (options.board) options.board.emit('keydown', e);
        }
    })

    eventsMap.set('wheel', {
        handler(e: Event) {
            if (!container.contains(e.target as HTMLElement)) return;
            e.preventDefault();

            // 缩放
            const { deltaX, deltaY, ctrlKey } = e as WheelEvent;
            if (ctrlKey) {
                const delta = damping(deltaY, options.maxZoom * 100 * 1.5, 10) / 100;

                canvas.zoomToPoint(canvas.getPointer(e, false), Math.max(canvas.getZoom() - delta, options.minZoom));
                // canvas.setZoom(Math.max(canvas.getZoom() - delta, options.minZoom));

                valideAndReZoom();
            } else {
                canvas.relativePan({
                    x: -deltaX,
                    y: -deltaY
                })
                autoScrollIntoview();
            }
        },
        options: {
            passive: false
        }
    })

    // 开始绑定事件
    Array.from(eventsMap.keys()).forEach(eventKey => {
        const define = eventsMap.get(eventKey);
        if (define) document.addEventListener(eventKey, define.handler, define.options);
    });

    const resetContainerBackground = debounce((el: HTMLDivElement) => {
        el.style.background = '';
    }, 1000)
    // 增加resizeObserver事件绑定
    const resizeObserver = new ResizeObserver(([containerSize]) => {
        // 强制设置一次背景颜色，防止闪烁
        const { contentRect: { width, height } } = containerSize;

        const container = getElement(canvas);
        container.style.background = canvas.backgroundColor?.toString() || '';

        const deltaX = width - canvas.getWidth();
        const deltaY = height - canvas.getHeight();

        if (deltaX) canvas.setWidth(width);
        if (deltaY) canvas.setHeight(height);

        canvas.relativePan({
            x: deltaX / 2,
            y: deltaY / 2
        })

        resetContainerBackground(container);
        canvas.renderAll();
    });
    resizeObserver.observe(container);
    Reflect.set(canvas, 'resizeObserver', resizeObserver);
}

export function unbindEvent(canvas: fabric.Canvas) {
    if (Reflect.has(canvas, EVENT_KEY)) {
        const eventsMap: DocumentEventMap = Reflect.get(canvas, EVENT_KEY);
        Array.from(eventsMap.keys()).forEach((eventKey) => {
            const define = eventsMap.get(eventKey);
            if (define) document.removeEventListener(eventKey, define.handler, define.options);
        });
        eventsMap.clear();
        Reflect.set(canvas, EVENT_KEY, undefined);
    };

    // 解绑resizeObserver
    if (Reflect.has(canvas, 'resizeObserver')) {
        const resizeObserver: ResizeObserver = Reflect.get(canvas, 'resizeObserver');
        resizeObserver.disconnect();
        Reflect.deleteProperty(canvas, 'resizeObserver');
    }
}