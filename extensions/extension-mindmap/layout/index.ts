/**
 * 布局功能
 * 感谢提供思路
 * @see https://leungwensen.github.io/blog/2017/mindmap-drawing-algorithms.html
 * @todo 支持动态注入其他的布局方案
 */
import { layout as standard } from './structure/standard'

import type { Board } from '@ymindmap/core'
import type { NodeView } from '@ymindmap/view'
import type {
    ILayoutController,
    IMargin,
    ILayoutControllerOptions
} from './type.d'
export class LayoutController implements ILayoutController {
    board: Board
    mindmap: NodeView
    _structure: string
    _margin: IMargin

    // 布局算法
    structures: Record<string, any> = {}

    /**
     * 内部的临时仓库
     */
    cacheStorage: Record<string, any> = {}

    constructor(options: ILayoutControllerOptions) {
        this.board = options.board
        this._structure = options.structure || 'standard'
        this._margin = options.margin;

        this.mindmap = options.mindmap;

        this.structures = {
            standard,
            ...options.structures
        }

        this.cacheStorage = {};
        // 开始布局
        this.doLayout();
    }

    get layoutMethod(): (this: ILayoutController, nodeVie: NodeView) => void {
        return this.structures[this._structure] || this.structures['standard']
    }

    setStructure(structure: string) {
        this._structure = structure;
        this.doLayout();
    }

    setMargin(margin: IMargin) {
        this._margin = margin;
    }

    doLayout(nodeView: NodeView = this.mindmap) {
        this.layoutMethod.call(this, nodeView)
    }
}