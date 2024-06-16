/**
 * 创建一个topic节点
 * 目前视图和数据的绑定在这里，如果变得复杂，之后需要额外移动到单独的类下
 * 数据监听by yjs
 * 创建流程，创建fabric的对应节点
 * fabric对应节点增加yoga
 * 生成子节点
 * 子节点添加yoga
 * 计算完后调整宽高等属性
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 * @todo 数据和视图的绑定迁移到对应的view对象上
 */

import { fabric } from 'fabric';
import { XmlText } from 'yjs';
import { Node, Theme, TopicStyle } from '@ymindmap/model';
import type { ITopicNodeAttrs } from './attr.d';
import Yoga from 'yoga-layout';

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
export function createTopic(node: Node<ITopicNodeAttrs>, theme: Theme, yoga: typeof Yoga) {
    const topicStyle = Object.assign(
        {},
        getTopicTheme(node, theme),
        node.attributes,
    );

    // 创建布局树
    const container = new fabric.Rect({
        backgroundColor: topicStyle.backgroundColor,
    });

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
                content.push(subNode.type.spec.toFabric(subNode, theme, yoga));
            }
        }
    })

    // 计算容器尺寸
    container.width = content[0].getScaledWidth();
    container.height = content[0].getScaledHeight();

    const group = new fabric.Group([container, ...content], {
        // padding: topicStyle.padding,
        hasControls: false,
        backgroundColor: 'rgb(0, 255, 136)',
    });

    return group;
}