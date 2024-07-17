/**
 * 需要自动排序的树
 * 因为排序的属性实际上不需要更新到ydoc上，所以直接控制ui即可
 * @see https://github.com/leungwensen/mindmap-layouts/blob/master/lib/algorithms/non-layered-tidy-tree.js#L39
 */
import { View } from '@ymindmap/view';

function layer(view: View, isHorizontal = true, d = 0) {
    if (!view.ui) return;

    if (isHorizontal) {
        view.ui.x = d;
        d += view.ui.getBounds().width;
    } else {
        view.ui.y = d;
        d += view.ui.getBounds().height;
    }

    if (view.children) {
        view.children.forEach(childView => {
            layer(childView as View, isHorizontal, d)
        })
    }
}

export function nonLayeredTidyTree(nodeView: View, isHorizontal = true, children: View[]) {
    const childViews = children || nodeView.children;
    childViews.forEach(childView => {
        layer(childView, isHorizontal);
    })
}

export default nonLayeredTidyTree;