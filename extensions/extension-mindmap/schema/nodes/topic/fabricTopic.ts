/**
 * 创建一个topic节点
 * 目前视图和数据的绑定在这里，如果变得复杂，之后需要额外移动到单独的类下
 * @see http://fabricjs.com/fabric-intro-part-3#subclassing
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 */

import { fabric } from 'fabric';
import { Node, NodeToFabricContext, Theme, TopicStyle } from '@ymindmap/model';

import type { ITopicNodeAttrs } from './attr';

type TopicOptions = {
    title?: string,
    color?: string, // 文字颜色
    backgroundColor?: string, // 背景颜色
    fontSize?: number,
    paddingTop?: number
    paddingRight?: number
    paddingBottom?: number
    paddingLeft?: number
    borderRadius?: number

}
const Topic = fabric.util.createClass(fabric.Group, {
    type: 'topic',
    initialize(options: TopicOptions = {}) {
        // 创建Itext
        const iText = new fabric.IText(options.title || '', {
            type: 'title',
            fill: options.color,
            fontSize: options.fontSize || 12,
        })

        // 创建背景
        const bg = new fabric.Rect({
            fill: options.backgroundColor,
            rx: options.borderRadius,
            ry: options.borderRadius
        })

        this.callSuper('initialize', [
            bg,
            iText,
        ], {
            ...options,
            editable: false,
            hasControls: false,
        });

        this.autoLayout();

        // 联动宽度变更
        iText.on('changed', () => {
            this.autoLayout(true)
        })
    },

    /**
     * @todo 修复尺寸过小问题
     * @param ignorePosition 
     */
    autoLayout(ignorePosition = false) {
        const { paddingLeft, paddingRight, paddingTop, paddingBottom } = this;
        const [bg, iText] = this._objects as [fabric.Rect, fabric.IText];

        bg.width = (iText.width || 0) + (paddingLeft || 0) + (paddingRight || 0);
        bg.height = (iText.height || 0) + (paddingTop || 0) + (paddingBottom || 0);

        this.width = bg.width;
        this.height = bg.height;

        if (!ignorePosition) {
            bg.left = -(bg.width || 0) / 2;
            bg.top = -(bg.height || 0) / 2;
            iText.left = (paddingLeft || 0) - ((bg.width || 0) / 2);
            iText.top = (paddingTop || 0) - ((bg.height || 0) / 2);
        }
    }
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
export function createTopic(node: Node<ITopicNodeAttrs>, context: NodeToFabricContext) {
    const topicStyle = Object.assign(
        {},
        getTopicTheme(node, context.theme),
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
        borderRadius: topicStyle.borderRadius,
        paddingTop,
        paddingRight,
        paddingLeft,
        paddingBottom,
        fontSize: topicStyle.fontSize || 14
    })

    // 进入编辑模式
    topic.on('mousedblclick', () => {
        if (!topic.editable) return;

        // 先解绑，然后将iText focus 之后进入编辑模式
        const objects: fabric.Object[] = topic.getObjects();
        const title = objects.find(item => item.type === 'title') as fabric.IText | undefined;
        if (!title) return;
        topic._restoreObjectsState();
        context.canvas.remove(topic);
        context.canvas.renderAll();
        objects.forEach((object) => context.canvas.add(object))
        context.canvas.setActiveObject(title);
        title.enterEditing();
        title.selectAll();
        context.canvas.renderAll();

        const regroup = () => {
            // 退出编辑模式，重新渲染topic
            objects.forEach(object => context.canvas.remove(object));
            context.canvas.renderAll();
            context.canvas.add(topic);
            // 内部的元素需要重新布局
            topic.autoLayout();
            context.canvas.renderAll();
            title.off('editing:exited', regroup);
        }

        // 退出编辑模式，重新渲染topic
        title.on('editing:exited', regroup);
    })

    return topic;
}