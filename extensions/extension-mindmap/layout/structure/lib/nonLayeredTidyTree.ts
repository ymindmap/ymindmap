/**
 * 需要自动排序的树
 * 因为排序的属性实际上不需要更新到ydoc上，所以直接控制ui即可
 * @see https://github.com/leungwensen/mindmap-layouts/blob/master/lib/algorithms/non-layered-tidy-tree.js#L39
 */
import { NodeView, View } from '@ymindmap/view';
import type { ILayoutController } from '../../type'

/**
 * 一个自动布局
 */
type LayerReturn = null | {
    view: NodeView,
    children: NodeView[],
    currentOffset: number,
}
type LayerOptions = {
    /** 横向布局 */
    isHorizontal: boolean,
    /** 当前offset */
    offset?: number,
}

function layer(this: ILayoutController, view: NodeView, options: LayerOptions): LayerReturn {
    if (!view.ui || !this.mindmap.ui) return null;
    let offset = options.offset || 0;
    const depth = this.mindmap.depth - view.depth;
    let margin = 0;
    // 判断margin
    if (depth === 1) {
        margin = this._margin[options.isHorizontal ? 'width' : 'height'];
    } else {
        margin = this._margin[options.isHorizontal ? 'childWidth' : 'childHeight'];
    }
    offset += margin

    if (options.isHorizontal) {
        view.ui.x = offset;
        offset += view.ui.width || 0;
    } else {
        view.ui.y = offset;
        offset += view.ui.height || 0;
    }

    const children: NodeView[] = view.children.filter(item => item instanceof NodeView) as unknown as NodeView[];
    if (children.length) {
        return {
            view,
            children,
            currentOffset: offset
        }
    }

    return null
}

export function nonLayeredTidyTree(
    this: ILayoutController,
    nodeView: NodeView,
    isHorizontal = true,
    children: View[],
    offset: number
) {
    const childViews = children || nodeView.children;
    if (!nodeView.ui) return;
    const layerTaskResults = childViews.map(childView => {
        if (!nodeView.ui) return null;
        if (childView instanceof NodeView) return layer.call(
            this,
            childView,
            {
                isHorizontal,
                offset: offset || isHorizontal
                    ? ((nodeView.ui.x || 0) + (nodeView.ui.width || 0))
                    : nodeView.ui.y ?? 0
            }
        );
        return null;
    })

    // 自动对齐机制
    if (this._autoAlign) {
        const maxOffset = Math.max(...layerTaskResults.map((result) => result ? result.currentOffset : 0));
        layerTaskResults.forEach((layerTaskResult) => {
            if (layerTaskResult) layerTaskResult.currentOffset = maxOffset;
        })
    }

    // 同层级之间距离

    // 继续排版子层级
    layerTaskResults.forEach((layerTaskResult) => {
        if (layerTaskResult) {
            // 子层级继续运行
            nonLayeredTidyTree.call(
                this,
                layerTaskResult.view,
                isHorizontal,
                layerTaskResult.children,
                layerTaskResult.currentOffset
            );
        }
    })
}

export default nonLayeredTidyTree;