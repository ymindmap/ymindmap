/**
 * 需要自动排序的树
 * 因为排序的属性实际上不需要更新到ydoc上，所以直接控制ui即可
 * @see https://github.com/leungwensen/mindmap-layouts/blob/master/lib/algorithms/non-layered-tidy-tree.js#L39
 */
import { NodeView, View } from '@ymindmap/view';
import type { ILayoutController } from '../../type'

function layer(this: ILayoutController, view: NodeView, isHorizontal = true, d = 0) {
    if (!view.ui || !this.mindmap.ui) return;
    const depth = this.mindmap.depth - view.depth;
    let margin = 0;
    // 判断margin
    if (depth === 1) {
        margin = this._margin[isHorizontal ? 'width' : 'height'];
    } else {
        margin = this._margin[isHorizontal ? 'childWidth' : 'childHeight'];
    }
    d += margin

    if (isHorizontal) {
        view.ui.x = d;
        d += view.ui.width || 0;
    } else {
        view.ui.y = d;
        d += view.ui.height || 0;
    }

    if (view.children) {
        view.children.forEach(childView => {
            if (childView instanceof NodeView) layer.call(this, childView, isHorizontal, d)
        })
    }
}

export function nonLayeredTidyTree(
    this: ILayoutController,
    nodeView: NodeView,
    isHorizontal = true,
    children: View[]
) {
    const childViews = children || nodeView.children;
    childViews.forEach(childView => {
        if (!nodeView.ui) return;
        if (childView instanceof NodeView) layer.call(
            this,
            childView,
            isHorizontal,
            isHorizontal
                ? ((nodeView.ui.x || 0) + (nodeView.ui.width || 0))
                : nodeView.ui.y ?? 0
        );
    })
}

export default nonLayeredTidyTree;