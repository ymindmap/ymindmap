/**
 * 创建一个topic节点
 * 目前视图和数据的绑定在这里，如果变得复杂，之后需要额外移动到单独的类下
 * @see http://fabricjs.com/fabric-intro-part-3#subclassing
 * @see https://github.com/fabricjs/fabric.js/issues/2574 // 绘制padding
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 */

import { fabric } from 'fabric';
import { Node, Theme, TopicStyle } from '@ymindmap/model';

import type { ITopicNodeAttrs } from './attr';

type TopicOptions = {
    title?: string,
    color?: string, // 文字颜色
    backgroundColor?: string, // 背景颜色
    paddingTop?: number
    paddingRight?: number
    paddingBottom?: number
    paddingLeft?: number

}
const Topic = fabric.util.createClass(fabric.Group, {
    type: 'topic',
    initialize(options: TopicOptions = {}) {
        // 创建Itext
        const iText = new fabric.IText(options.title || '', {
            fill: options.color,
            left: options.paddingLeft || 0,
            top: options.paddingTop || 0,
        })

        // 创建背景
        const bg = new fabric.Rect({
            width: (iText.width || 0) + (options.paddingLeft || 0) + (options.paddingRight || 0),
            height: (iText.height || 0) + (options.paddingTop || 0) + (options.paddingBottom || 0),
            fill: options.backgroundColor
        })

        this.callSuper('initialize', [
            bg,
            iText,
        ], {
            ...options,
            hasControls: false,
        });
    },

    // _render(ctx: CanvasRenderingContext2D) {
    //     // 绘制本身的文字
    //     // ctx.fillStyle = this.color;
    //     ctx.fillStyle = '#000';
    //     this.callSuper('_render', ctx);

    //     // 绘制背景颜色 + padding
    //     const { x, y } = this._getNonTransformedDimensions();
    //     ctx.fillStyle = this.fill;
    //     ctx.fillRect(
    //         // x,
    //         // y,
    //         0,
    //         0,
    //         this.width + (this.paddingLeft || 0) + (this.paddingRight || 0),
    //         this.height + (this.paddingTop || 0) + (this.paddingBottom || 0)
    //     )
    // }
})

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

    const [
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    ]: [number, number, number, number] = Array.isArray(topicStyle.padding)
            ? topicStyle.padding
            : new Array(4).fill(topicStyle.padding || 0) as [number, number, number, number];

    const topic = new Topic({
        title: node.attributes?.title || '请输入内容',
        color: topicStyle.color,
        backgroundColor: topicStyle.backgroundColor,
        rx: topicStyle.borderRadius,
        ry: topicStyle.borderRadius,
        paddingTop,
        paddingRight,
        paddingLeft,
        paddingBottom,
    })

    return topic;
}