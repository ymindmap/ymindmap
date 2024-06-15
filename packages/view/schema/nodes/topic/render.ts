/**
 * 创建一个topic节点
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 */

import { fabric } from 'fabric';
import { XmlText } from 'yjs';
import { Node, Theme, TopicStyle } from '@ymindmap/model';
import { ITopicNodeAttrs } from './attr.d';

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
export function renderTopic(node: Node<ITopicNodeAttrs>, theme: Theme) {
    const topicStyle = Object.assign(
        {},
        getTopicTheme(node, theme),
        node.attributes,
    );

    const content: fabric.Object[] = [];
    // 生成内容 需要之后增加layout布局
    node.data.forEach((dataItem) => {
        if (dataItem instanceof XmlText) {
            const text = new fabric.Text(dataItem.toString(), {
                fontSize: topicStyle.fontSize
            })
            content.push(text);
        } else {
            const subNode = node.type.schema?.parseNode(dataItem);
            if (subNode && subNode.type.spec.toFabric) {
                content.push(subNode.type.spec.toFabric(subNode, theme));
            }
        }
    })
    const group = new fabric.Group(content);
    return group;
}