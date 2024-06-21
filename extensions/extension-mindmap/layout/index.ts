/**
 * 布局功能
 * 感谢提供思路
 * @see https://leungwensen.github.io/blog/2017/mindmap-drawing-algorithms.html
 * 
 * @todo 支持动态注入其他的布局方案
 */
import type { Board } from '@ymindmap/core'
import type { NodeView } from '@ymindmap/view'

export type IMargin = {
    height: number;
    width: number;
    childHeight: number;
    childWidth: number;
}

export interface ILayoutControllerOptions {
    board: Board
    structure?: string
    mindmap: NodeView,
    structures?: Record<string, any>
    margin: IMargin
}
export class LayoutController {
    board: Board
    mindmap: NodeView

    _structure: string = 'right'
    _margin: IMargin

    // 布局算法
    structures: Record<string, any> = {}

    constructor(options: ILayoutControllerOptions) {
        this.board = options.board
        this._structure = options.structure || 'right'
        this._margin = options.margin;

        this.mindmap = options.mindmap;
    }

    get layoutMethod(): any {
        return this.structures[this._structure] || this.structures['right']
    }

    setStructure(structure: string) {
        this._structure = structure;
        this.doLayout();
    }

    setMargin(margin: IMargin) {
        this._margin = margin;
    }

    doLayout(nodeView: NodeView = this.mindmap) {
        console.log(nodeView)
    }
}