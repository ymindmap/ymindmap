/**
 * 创建一个topic节点
 * 目前视图和数据的绑定在这里，如果变得复杂，之后需要额外移动到单独的类下
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 */

import { Box, defineKey } from 'leafer-ui';
import { Node, NodeToCanvasContext, Theme, TopicStyle } from '@ymindmap/model';

import type { ITopicNodeAttrs } from './attr';

function getTopicTheme(node: Node<ITopicNodeAttrs>, theme: Theme): TopicStyle {
    let topicTheme = theme.childTopic;
    if (node.depth === 0) {
        topicTheme = theme.centerTopic;
    }
    if (node.depth === 1) {
        topicTheme = theme.subTopic
    }
    return topicTheme;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createTopic(node: Node<ITopicNodeAttrs>, context: NodeToCanvasContext) {
    const topicStyle = Object.assign(
        {},
        getTopicTheme(node, context.theme),
        node.attributes,
    );

    const padding: [number, number, number, number] = Array.isArray(topicStyle.padding)
        ? topicStyle.padding
        : new Array(4).fill(topicStyle.padding || 0) as [number, number, number, number];

    const topic = new Box({
        fill: topicStyle.backgroundColor,
        className: 'topic',
        fontSize: topicStyle.fontSize || 14,
        cornerRadius: topicStyle.borderRadius,
        draggable: true,
        id: node.attributes?.id,
        editable: true,
        children: [
            {
                className: 'topic-title',
                tag: 'Text',
                padding,
                editable: false,
                // tag: 'title',
                text: node.attributes?.title || '请输入内容',
                fill: topicStyle.color,
            }
        ]
    })

    // 设置无法缩放等功能
    defineKey(topic, 'editConfig', {
        get() {
            return {
                moveable: false,
                resizeable: false,
                rotateable: false,
                skewable: false
            }
        }
    })

    return topic;
}