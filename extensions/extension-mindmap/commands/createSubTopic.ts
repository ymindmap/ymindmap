/**
 * 创建一个子主题
 */
import { NodeView, View } from '@ymindmap/view';
import { topic as topicNodeType } from '../schema/nodes/topic';
import { mindmap as mindmapNodeType } from '../schema/nodes/mindmap'

import type { Command } from '@ymindmap/core';
import type { Node } from '@ymindmap/model';
import type { IStorage } from '../index'

/**
 * 创建子节点
 * @param topic 
 * @returns 
 */
export const createSubTopic: (topic: Node<any>, storage: IStorage) => Command = (topic, storage) => () => {
    if (topic.type === topicNodeType || topic.type === mindmapNodeType) {
        const subTopic = topicNodeType.create();
        topic.appendChild(subTopic);

        /**
         * 创建后自动重新layout
         */
        const findMindmap = (topic: Node<any>): Node<any> | null => {
            if (topic.type === mindmapNodeType) return topic;
            if (!topic) return null;
            if (!topic.parent) return null;
            return findMindmap(topic.parent);
        }
        const mindmapNode = findMindmap(topic);
        const mindmapView = mindmapNode ? View.NodeViewMap.get(mindmapNode) : null;
        if (mindmapView && storage.nodeLayoutControllerMap.has(mindmapView as NodeView)) {
            const layout = storage.nodeLayoutControllerMap.get(mindmapView as NodeView)
            layout?.doLayout();
            // 需要第二次排版，第一次可能文字导致宽高变化
            setTimeout(() => layout?.doLayout(), 0)
        }

        return true
    }
    return false;
}
