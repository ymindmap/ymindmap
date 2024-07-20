/**
 * 左侧布局
 */
import { NodeView, View } from '@ymindmap/view'
import { nonLayeredTidyTree } from './lib/nonLayeredTidyTree'
import { right2left } from './lib/rightToLeft';
import type { ILayoutController } from '../type';

export function layout(this: ILayoutController, node: View) {
    const root = this.mindmap;

    // 排序两个树
    nonLayeredTidyTree.call(this, root, true, node.children);
    // 左侧树反转
    right2left(root, node.children as NodeView[]);
}