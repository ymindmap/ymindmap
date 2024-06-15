/**
 * 创建一个topic节点
 */

import { fabric } from 'fabric';
import { Node, Theme } from '@ymindmap/model';
import { ITopicNodeAttrs } from './attr.d';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderTopic(node: Node<ITopicNodeAttrs>, theme: Theme) {
    const rect = new fabric.Rect({
        width: 20,
        height: 20,
        backgroundColor: '#000000',
        hasControls: false,
    });
    return rect;
}