/**
 * 标准左右布局
 */
import { NodeView } from '@ymindmap/view'
import type { ILayoutController } from '../type.d';

function getIndexIsLeftAxis(index: number) {
    return index % 2 === 0
}

/**
 * 获取一个节点是左侧还是右侧
 */
function getNodeIsLeftAxis(viewNodeView: NodeView, rootView: NodeView): boolean {
    function getLatestParentToRoot(currentView: NodeView) {
        if (currentView === rootView) return null;
        if (currentView.parent === rootView) return currentView;
        if (!currentView.parent) return null;
        return getLatestParentToRoot(currentView.parent as NodeView);
    }
    const latestParentNodeView = getLatestParentToRoot(viewNodeView);
    if (latestParentNodeView) {
        const index = rootView.children.indexOf(latestParentNodeView);
        if (index === -1) return false;
        return getIndexIsLeftAxis(index);
    }
    return false;
}

export function layout(this: ILayoutController, node: NodeView) {
    const root = this.mindmap;
    if (root === node) {
        const { left, right } = (node.children as NodeView[]).reduce<{
            left: NodeView[],
            right: NodeView[]
        }>((result, nodeView, index) => {
            if (getIndexIsLeftAxis(index)) {
                result.left.push(nodeView)
            } else {
                result.right.push(nodeView);
            }
            return result;
        }, {
            left: [],
            right: []
        })

        console.log(left, right);

        return;
    }

    // // 区分左右
    // if (root === node) {
    // } else {
    //     // find左右
    // }
}