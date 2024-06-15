/**
 * 创建一个topic节点
 * fabric的padding需要修改
 * @see https://github.com/fabricjs/fabric.js/issues/4347
 */

import { fabric } from 'fabric';
import { XmlText } from 'yjs';
import { Node, Theme, TopicStyle } from '@ymindmap/model';
import { ITopicNodeAttrs } from './attr.d';

class TopicFabricObject extends fabric.Rect {
    paddingX?: number;
    paddingY?: number;

    constructor(options: fabric.IRectOptions & {
        padding?: [number, number] | number
    }) {
        super(options);

        if (Array.isArray(options.padding)) {
            const [paddingY, paddingX] = options.padding;
            this.paddingX = paddingX;
            this.paddingY = paddingY;
            this.padding = undefined;
        }
    }
}

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

    const rect = new TopicFabricObject({
        width: 20,
        height: 20,
        padding: topicStyle.padding,
        fill: topicStyle.backgroundColor,
        hasControls: false,
    });

    // 文字
    if (node.data.firstChild instanceof XmlText) {
        const text = node.data.firstChild.toString();
        const textBox = new fabric.Textbox(text, {
            fontSize: topicStyle.fontSize
        });
        return textBox;
    }

    return rect;
}