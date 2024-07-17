/**
 * 标准左右布局
 */
import { View } from '@ymindmap/view'
import { nonLayeredTidyTree } from './lib/nonLayeredTidyTree'
import type { ILayoutController } from '../type.d';

function getIndexIsLeftAxis(index: number) {
    return index % 2 === 0
}

/**
 * 获取一个节点是左侧还是右侧
 */
function getNodeIsLeftAxis(viewNodeView: View, rootView: View): boolean {
    function getLatestParentToRoot(currentView: View) {
        if (currentView === rootView) return null;
        if (currentView.parent === rootView) return currentView;
        if (!currentView.parent) return null;
        return getLatestParentToRoot(currentView.parent as View);
    }
    const latestParentNodeView = getLatestParentToRoot(viewNodeView);
    if (latestParentNodeView) {
        const index = rootView.children.indexOf(latestParentNodeView);
        if (index === -1) return false;
        return getIndexIsLeftAxis(index);
    }
    return false;
}

export function layout(this: ILayoutController, node: View) {
    const root = this.mindmap;
    if (root === node) {
        const { left, right } = (node.children as View[]).reduce<{
            left: View[],
            right: View[]
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

        // 排序两个树
        nonLayeredTidyTree(root, true, left);
        nonLayeredTidyTree(root, true, right);

        // 左侧树

        return;
    }

    // // 区分左右
    // if (root === node) {
    // } else {
    //     // find左右
    // }
}