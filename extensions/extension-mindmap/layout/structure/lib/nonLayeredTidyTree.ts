/**
 * 需要自动排序的树
 * 因为排序的属性实际上不需要更新到ydoc上，所以直接控制ui即可
 * @see https://github.com/leungwensen/mindmap-layouts/blob/master/lib/algorithms/non-layered-tidy-tree.js#L39
 */
import { NodeView } from '@ymindmap/view';

function layer(nodeView: NodeView, isHorizontal = true, d = 0) {
    if (!nodeView.ui) return;

    if (isHorizontal) {
        nodeView.ui.x = d;
        d += nodeView.ui.getBounds().width;
    } else {
        nodeView.ui.y = d;
        d += nodeView.ui.getBounds().height;
    }

}

export function nonLayeredTidyTree(nodeView: NodeView, isHorizontal = true, children: NodeView[] = []) {
    console.log(nodeView.getMatrix());
}

export default nonLayeredTidyTree;