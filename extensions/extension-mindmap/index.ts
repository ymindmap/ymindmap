import {
    VIEW_KEY,
    NodeView
} from '@ymindmap/view'
import { topic, mindmap } from './schema'
import { LayoutController } from './layout'
import {
    moveRootMindmapToCenter,
    createSubTopic
} from './commands'
import type { IExtensionConfig } from '@ymindmap/core'

export type IOptions = NonNullable<unknown>
export type IStorage = {
    nodeLayoutControllerMap: WeakMap<NodeView, LayoutController>
}

export const MindmapExtension: IExtensionConfig<IOptions, IStorage> = {
    addNodes() {
        return {
            topic,
            mindmap
        }
    },

    addStorage() {
        return {
            nodeLayoutControllerMap: new WeakMap()
        }
    },

    addCommands() {
        return {
            createSubTopic,
            moveRootMindmapToCenter
        }
    },

    addKeymap() {
        const { storage } = this;
        return {
            "Tab": (state, view) => {
                if (state.selected.length === 1) return createSubTopic(state.selected[0], storage)(state, view);
                return false;
            }
        }
    },

    async onCreate(board) {
        if (!board.view) return;
        if (board.commands.moveRootMindmapToCenter) board.commands.moveRootMindmapToCenter();

        // 目前mindmap必须在第一层可以直接靠getObjects获取，之后可能会改成迭代遍历
        const mindmapViews: NodeView[] = board.view.ui
            .find('.mindmap')
            .map(item => Reflect.get(item, VIEW_KEY))
            .filter(item => !!item);
        mindmapViews.forEach(mindmap => {
            this.storage.nodeLayoutControllerMap.set(mindmap, new LayoutController({
                mindmap,
                board,
                margin: {
                    height: 20,
                    width: 60,
                    childWidth: 60,
                    childHeight: 20
                }
            }))
        })
    }
}

export default MindmapExtension;