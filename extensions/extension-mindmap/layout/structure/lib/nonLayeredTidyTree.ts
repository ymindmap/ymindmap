/**
 * 需要自动排序的树
 * 因为排序的属性实际上不需要更新到ydoc上，所以直接控制ui即可
 * @see https://github.com/leungwensen/mindmap-layouts/blob/master/lib/algorithms/non-layered-tidy-tree.js#L39
 */
import { NodeView, View } from '@ymindmap/view';
import type { Node } from '@ymindmap/model'
import type { ITopicNodeAttrs } from '../../../schema/nodes/topic/attr.d'
import type { ILayoutController } from '../../type'

/**
 * 一个自动布局
 */
type LayerReturn = {
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
    const empty: LayerReturn = {
        children: [],
        view,
        currentOffset: options.offset || 0
    }
    if (!view.ui) return empty;
    let offset = options.offset || 0;
    offset += getMargin.call(this, view, options.isHorizontal);
    const boxBounds = view.ui.boxBounds;

    if (options.isHorizontal) {
        view.ui.x = offset;
        offset += boxBounds.width || 0;
    } else {
        view.ui.y = offset;
        offset += boxBounds.height || 0;
    }

    const children: NodeView[] = view.children.filter(item => item instanceof NodeView) as unknown as NodeView[];
    if (children.length) {
        return {
            view,
            children,
            currentOffset: offset
        }
    }

    return empty
}

function getMargin(this: ILayoutController, node: NodeView, isHorizontal: boolean) {
    const mindmapDepth = this.mindmap.depth;
    const depth = mindmapDepth - (node.depth || 0);
    const margin = depth === 1 ? this._margin[isHorizontal ? 'height' : 'width'] : this._margin[isHorizontal ? 'childHeight' : 'childWidth'];
    return margin;
}

/**
 * 获取其尺寸，和子节点有关系
 * @param this 
 * @param view 
 * @param isHorizontal 
 */
function getNodeSize(this: ILayoutController, childNodes: NodeView[], isHorizontal = false): number {
    return childNodes.reduce((total, node, index) => {
        if (!node.ui) return total;
        if (index > 0) total += getMargin.call(this, node, !isHorizontal);

        const nodeSize = node.ui.boxBounds[isHorizontal ? 'height' : 'width'] || 0;
        total += node.children.length
            ? Math.max(getNodeSize.call(this, node.children as NodeView[], isHorizontal), nodeSize)
            : nodeSize

        return total;
    }, 0)
}

function alignSameLevel(this: ILayoutController, nodeView: NodeView, layerTaskResults: LayerReturn[], isHorizontal: boolean) {
    if (!nodeView.ui) return;
    const totalSize = Math.max(
        getNodeSize.call(
            this,
            layerTaskResults.map(item => item.view),
            isHorizontal
        ),
        nodeView.ui
            ? (nodeView.ui.boxBounds[isHorizontal ? 'height' : 'width'] || 0)
            : 0
    );
    let currentOffset = totalSize - nodeView.ui.boxBounds[isHorizontal ? 'height' : 'width'] / 2;

    layerTaskResults.forEach((result, index) => {
        if (result.view.ui) {
            console.log(currentOffset, result.view.ui.boxBounds[isHorizontal ?
                'height' : 'width'])
            result.view.ui[isHorizontal ? 'y' : 'x'] = currentOffset - result.view.ui.boxBounds[isHorizontal ?
                'height' : 'width'];
            currentOffset += (result.view.ui.boxBounds[isHorizontal ? 'height' : 'width'] || 0);
            if (index > 0) currentOffset += getMargin.call(this, result.view, !isHorizontal);
        }
    })
}

export function nonLayeredTidyTree(
    this: ILayoutController,
    nodeView: NodeView,
    isHorizontal = true,
    children: View[],
    offset: number = 0
) {
    if (!nodeView.ui) return;

    const node = nodeView.node as Node<ITopicNodeAttrs>;
    if (node.attributes.collapsed === 'true') return; // 当前被收起
    const childViews = children || nodeView.children;

    const layerTaskResults = childViews.reduce<LayerReturn[]>((results, childView) => {
        if (!nodeView.ui) return results;
        if (childView instanceof NodeView) {
            results.push(layer.call(
                this,
                childView,
                {
                    isHorizontal,
                    offset: offset || isHorizontal
                        ? ((nodeView.ui.x || 0) + (nodeView.ui.boxBounds.width || 0))
                        : nodeView.ui.y ?? 0
                }
            ))
        };
        return results;
    }, [])

    // 自动对齐机制
    if (this._autoAlign) {
        const maxOffset = Math.max(...layerTaskResults.map((result) => result ? result.currentOffset : 0));
        layerTaskResults.forEach((layerTaskResult) => {
            if (layerTaskResult) layerTaskResult.currentOffset = maxOffset;
        })
    }

    // 同层级之间排版
    if (layerTaskResults.length) {
        alignSameLevel.call(this, nodeView, layerTaskResults, isHorizontal);
    }

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