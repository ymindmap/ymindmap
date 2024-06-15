/**
 * zoom的实现
 * 核心逻辑来自
 * @see https://www.npmjs.com/package/viewerjs
 */
import { fabric } from 'fabric';
import { debounce, throttle } from 'lodash-es';

type ZoomEventsMap = Map<string, {
    handler: (e: Event) => void,
    options?: {
        passive?: boolean
        capture?: boolean
    }
}>;
const key = '_zoomEvents';
const zoomRate = 10;

// 阻尼函数
function damping(source: number, sourceMax: number, rate: number = 100) {
    const max = sourceMax * rate;
    const x = source * rate;
    const y = 0.82231 * max / (1 + 4338.47 / Math.pow(Math.abs(x), 1.14791));
    return Math.floor(Math.round(x < 0 ? -y : y) / rate);
}

export function bindEvent(canvas: fabric.Canvas, options: { minZoom: number, maxZoom: number }) {
    // 校验
    const zoomWithDamping = throttle((targetScale: number) => {
        if (Math.floor(targetScale * 100) === Math.floor(canvas.getZoom() * 100)) return;
        const delta = Math.max(damping(zoomRate, (canvas.getZoom() - targetScale) * 100) / 100, 0.01);

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
    }, 1000)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container: HTMLDivElement = (canvas as any).wrapperEl;

    const eventsMap: ZoomEventsMap = new Map();
    Reflect.set(canvas, key, eventsMap);
    // 绑定对应的事件实现缩放效果

    // 绑定keydown目前不生效，触发的对象一直是body，需要修复
    // eventsMap.set('keydown', {
    //     handler: (e: Event) => {
    //         if (!container.contains(e.target as HTMLElement)) return;
    //         const event = e as KeyboardEvent;
    //         // ctrl +- 改为正常缩放
    //         if (event.ctrlKey || event.metaKey) {
    //             // +在 ctrl 下会变成 =
    //             if (event.key === '+' || event.key === '-' || event.key === '=') {
    //                 zoomWithDamping.cancel();
    //                 event.preventDefault();
    //                 event.stopPropagation();
    //                 canvas.setZoom(canvas.getZoom() + zoomRate * (event.key === '-' ? -1 : 1));
    //                 valideAndReZoom();
    //             }
    //         }
    //     }
    // })

    eventsMap.set('wheel', {
        handler(e: Event) {
            if (!container.contains(e.target as HTMLElement)) return;
            e.preventDefault();

            // 缩放
            const { deltaX, deltaY, ctrlKey } = e as WheelEvent;
            if (ctrlKey) {
                const delta = damping(deltaY, options.maxZoom * 100 * 1.5, 10) / 100;
                canvas.setZoom(Math.max(canvas.getZoom() - delta, options.minZoom));
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

    // 增加resizeObserver事件绑定
    const resizeObserver = new ResizeObserver(([containerSize]) => {
        const { contentRect: { width, height } } = containerSize;
        if (width !== canvas.getWidth()) canvas.setWidth(width);
        if (height !== canvas.getHeight()) canvas.setHeight(height);
    });
    resizeObserver.observe(container);
    Reflect.set(canvas, 'resizeObserver', resizeObserver);
}

export function unbindEvent(canvas: fabric.Canvas) {
    if (Reflect.has(canvas, key)) {
        const eventsMap: ZoomEventsMap = Reflect.get(canvas, key);
        Array.from(eventsMap.keys()).forEach((eventKey) => {
            const define = eventsMap.get(eventKey);
            if (define) document.removeEventListener(eventKey, define.handler, define.options);
        });
        eventsMap.clear();
        Reflect.set(canvas, key, undefined);
    };

    // 解绑resizeObserver
    if (Reflect.has(canvas, 'resizeObserver')) {
        const resizeObserver: ResizeObserver = Reflect.get(canvas, 'resizeObserver');
        resizeObserver.disconnect();
        Reflect.deleteProperty(canvas, 'resizeObserver');
    }
}