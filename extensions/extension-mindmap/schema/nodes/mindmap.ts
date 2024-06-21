/**
 * 容器的doc节点
 */
import { NodeType, NodeSpec } from '@ymindmap/model';
import { nanoid } from 'nanoid'
import { createTopic } from './topic/fabricTopic'
import { ITopicNodeAttrs } from './topic/attr.d'

export const mindmap = NodeType.createNode<NodeSpec<
    ITopicNodeAttrs & {
        marginHeight: string;
        marginWidth: string;
        childMarginHeight: string;
        childMarginWidth: string;
        theme: string;
        structure: string;
        left?: string
        top?: string
    }>
>({
    name: 'mindmap',
    attrs: {
        id: {
            default: nanoid
        },
        marginHeight: {
            default: '20'
        },
        marginWidth: {
            default: '20'
        },
        childMarginHeight: {
            default: '20'
        },
        childMarginWidth: {
            default: '20'
        },
        theme: {
            default: 'default'
        },
        structure: {
            default: 'right',
        },
    },
    toFabric: (node, context) => {
        const mindmapRootTopic = createTopic(node, context);
        mindmapRootTopic.set('type', 'mindmap'); // 修改名称
        const isAutoToCenter = !Reflect.has(node.attributes, 'left') && !Reflect.has(node.attributes, 'top');
        if (isAutoToCenter) context.canvas.centerObject(mindmapRootTopic)
        return mindmapRootTopic;
    }
})

export default mindmap;