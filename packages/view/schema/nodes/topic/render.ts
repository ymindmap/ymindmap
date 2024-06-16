/**
 * 创建一个topic节点
 * 目前视图和数据的绑定在这里，如果变得复杂，之后需要额外移动到单独的类下
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 * @todo 数据和视图的绑定迁移到对应的view对象上
 */

import { fabric } from 'fabric';
import { XmlText } from 'yjs';
import { Node, Theme, TopicStyle, ToFabricContext } from '@ymindmap/model';
import { ElementObjectView, TextObjectView } from '../../../index'
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
export function createTopic(node: Node<ITopicNodeAttrs>, theme: Theme, context: ToFabricContext) {
    const topicStyle = Object.assign(
        {},
        getTopicTheme(node, theme),
        node.attributes,
    );

    // 创建容器
    const containerObject = new fabric.Rect({
        fill: topicStyle.backgroundColor,
        rx: topicStyle.borderRadius,
        ry: topicStyle.borderRadius
    });
    const padding: [number, number, number, number] = Array.isArray(topicStyle.padding)
        ? topicStyle.padding
        : new Array(4).fill(topicStyle.padding || 0) as [number, number, number, number];
    const rootView = ElementObjectView.create({
        ...context,
        view: containerObject,
        data: node.data,
        parent: context.parent,
        style: {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3]
        },
    })

    const content: fabric.Object[] = [];
    // 生成内容 需要之后增加layout布局
    node.data.forEach((dataItem) => {
        if (dataItem instanceof XmlText) {
            const textObject = new fabric.IText(dataItem.toString(), {
                editable: false,
                fill: topicStyle.color,
                fontSize: topicStyle.fontSize
            })
            content.push(textObject);
            TextObjectView.create({
                ...context,
                view: textObject,
                data: dataItem,
                parent: rootView,
                style: {
                    width: textObject.width,
                    height: textObject.height
                },
            })
        } else {
            const subNode = node.type.schema?.parseNode(dataItem);
            if (subNode && subNode.type.name === 'topic') return createTopic(subNode, theme, context);
        }
    })

    rootView.updateView();

    const group = new fabric.Group(
        [containerObject, ...content],
    );

    return group;
}