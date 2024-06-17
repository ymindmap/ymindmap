/**
 * 创建一个topic节点
 * 目前视图和数据的绑定在这里，如果变得复杂，之后需要额外移动到单独的类下
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 */

import { fabric } from 'fabric';
import { Node, Theme, TopicStyle } from '@ymindmap/model';
import type { ITopicNodeAttrs } from './attr.d';

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
export function createTopic(node: Node<ITopicNodeAttrs>, theme: Theme) {
    const topicStyle = Object.assign(
        {},
        getTopicTheme(node, theme),
        node.attributes,
    );

    // 创建分组
    const group = new fabric.Group([]);

    // 创建容器
    const containerObject = new fabric.Rect({
        fill: topicStyle.backgroundColor,
        rx: topicStyle.borderRadius,
        ry: topicStyle.borderRadius
    });
    const padding: [number, number, number, number] = Array.isArray(topicStyle.padding)
        ? topicStyle.padding
        : new Array(4).fill(topicStyle.padding || 0) as [number, number, number, number];
    console.log(padding);
    group.addWithUpdate(containerObject);

    return group;
}