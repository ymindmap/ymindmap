/**
 * 容器的doc节点
 */
import { NodeType } from '@ymindmap/model';

export const mindmap = NodeType.createNode({
    name: 'mindmap',
    attrs: {
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
        background: {
            default: '#ffffff'
        }
    },
})

export default mindmap;