/**
 * 生成domElement
 */
import { fabric } from 'fabric';
import { bindEvent, unbindEvent } from './events'
import type { Board } from '@ymindmap/core'

const KEY = '__ymindmap_events_binded__'

export function getElement(canvas: fabric.Canvas, board?: Board): HTMLDivElement {
    // 自动生成绑定的dom元素
    // eslint-disable-next-line 
    const element = (canvas as unknown as any).wrapperEl as HTMLDivElement;
    if (!Reflect.has(element, KEY)) {
        bindEvent(canvas, { minZoom: 0.1, maxZoom: 3, board });
        Reflect.set(element, KEY, true);
    }
    return element;
}

export function destroy(canvas: fabric.Canvas) {
    unbindEvent(canvas);
}