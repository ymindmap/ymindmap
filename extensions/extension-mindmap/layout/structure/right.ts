/**
 * 左侧布局
 */
import { View } from '@ymindmap/view'
import { nonLayeredTidyTree } from './lib/nonLayeredTidyTree'
import type { ILayoutController } from '../type';

export function layout(this: ILayoutController, node: View) {
    const root = this.mindmap;

    // 排序两个树
    nonLayeredTidyTree.call(this, root, true, node.children);
}