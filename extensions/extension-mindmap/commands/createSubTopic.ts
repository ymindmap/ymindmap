/**
 * 创建一个子主题
 */
import { topic as topicNodeType } from '../schema/nodes/topic';
import { mindmap as mindmapNodeType } from '../schema/nodes/mindmap'

import type { Command } from '@ymindmap/core';
import type { Node } from '@ymindmap/model';


/**
* 移动到中心
* @param state 
* @param view 
* @returns 
*/
export const createSubTopic: (topic: Node<any>) => Command = (topic) => () => {
    if (topic.type === topicNodeType || topic.type === mindmapNodeType) {
        const subTopic = topicNodeType.create();
        topic.appendChild(subTopic);
        return true
    }
    return false;
}