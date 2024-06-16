/**
 * 创建一个topic节点
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 * @todo 数据和视图的绑定迁移到对应的view对象上
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
            const textObject = new fabric.Text(dataItem.toString(), {
                fontSize: topicStyle.fontSize
            })

            dataItem.observe(() => {
                textObject.set({
                    text: dataItem.toString()
                })
            })

            content.push(textObject);
        } else {
            const subNode = node.type.schema?.parseNode(dataItem);
            if (subNode && subNode.type.spec.toFabric) {
                content.push(subNode.type.spec.toFabric(subNode, theme));
            }
        }
    })
    const group = new fabric.Group(content, {
        // padding: topicStyle.padding
        backgroundColor: 'rgb(0, 255, 136)',
    });

    return group;
}