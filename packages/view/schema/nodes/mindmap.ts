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
    }
>>({
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
    toFabric: createTopic
})

export default mindmap;