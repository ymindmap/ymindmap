/**
 * 创建一个topic节点
 * 目前视图和数据的绑定在这里，如果变得复杂，之后需要额外移动到单独的类下
 * @see http://fabricjs.com/fabric-intro-part-3#subclassing
 * @todo 支持latex https://jsfiddle.net/3aHQc/39/
 */

import { fabric } from 'fabric';
import { Node, Theme, TopicStyle } from '@ymindmap/model';
import type { ITopicNodeAttrs } from './attr';

const Topic = fabric.util.createClass(fabric.Rect, {
    type: 'topic',
    initialize: function(options: any) {
        options || (options = { });
        this.callSuper('initialize', options);
        this.set('label', options.label || '请输入内容');
      },
    
      toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
          label: this.get('label')
        });
      },
    
      _render: function(ctx: any) {
        this.callSuper('_render', ctx);
        ctx.font = '20px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
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
    ]: [number, number, number, number]  = Array.isArray(topicStyle.padding)
    ? topicStyle.padding
    : new Array(4).fill(topicStyle.padding || 0) as [number, number, number, number];

    const topic = new Topic({
        fill: topicStyle.backgroundColor,
        rx: topicStyle.borderRadius,
        ry: topicStyle.borderRadius,
        paddingTop,
        paddingRight,
        paddingLeft,
        paddingBottom
    })

    return topic;
}