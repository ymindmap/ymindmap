import { NodeType, NodeSpec } from '@ymindmap/model'
import { nanoid } from 'nanoid'
import { createTopic } from './fabricTopic';
import type { ITopicNodeAttrs } from './attr.d';

export const topic = NodeType.createNode<NodeSpec<ITopicNodeAttrs>>({
    name: 'topic',
    attrs: {
        id: {
            default: nanoid,
        },
        title: {
            default: ''
        }
    },

    /**
     * 一个topic节点
     * @param node 
     */
    toFabric: createTopic
})

export default topic;