/**
 * 创建一个topic节点
 */

import { fabric } from 'fabric';
import { Node } from '@ymindmap/model';
import { ITopicNodeAttrs } from './attr.d';

export function renderTopic(node: Node<ITopicNodeAttrs>, storage: Map<string, any>) {
    const rect = new fabric.Rect({
        width: 20,
        height: 20,
        backgroundColor: '#000000',
        hasControls: false,
    });
    return rect;
}