/**
 * 生成domElement
 * @todo 考虑销毁相关问题
 */
import { fabric } from 'fabric';
import { bindEvent, unbindEvent } from './events'

const KEY = '__ymindmap_events_binded__'

export function getElement(canvas: fabric.Canvas): HTMLDivElement {
    // 自动生成绑定的dom元素
    // eslint-disable-next-line 
    const element = (canvas as unknown as any).wrapperEl as HTMLDivElement;
    if (!Reflect.has(element, KEY)) {
        bindEvent(canvas, { minZoom: 0.1, maxZoom: 3 });
        Reflect.set(element, KEY, true);
    }
    return element;
}

export function destroy(canvas: fabric.Canvas) {
    unbindEvent(canvas);
}