/**
 * 需要自动排序的树
 * @see https://github.com/leungwensen/mindmap-layouts/blob/master/lib/algorithms/non-layered-tidy-tree.js#L39
 */
import { NodeView } from '@ymindmap/view';

export function nonLayeredTidyTree(nodeView: NodeView, isHorizontal = true, children: NodeView[]) {
    console.log(nodeView.getMatrix());
}

export default nonLayeredTidyTree;