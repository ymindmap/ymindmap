/**
 * 布局功能
 * 感谢提供思路
 * @see https://leungwensen.github.io/blog/2017/mindmap-drawing-algorithms.html
 * @todo 支持动态注入其他的布局方案
 */
import { structures } from './structure';

import type { Board } from '@ymindmap/core'
import type { NodeView } from '@ymindmap/view'
import type {
    ILayoutController,
    IMargin,
    ILayoutControllerOptions
} from './type.d'

const DEFAULT_STRUCTURE = 'right'

export class LayoutController implements ILayoutController {
    board: Board
    mindmap: NodeView
    _structure: string
    _margin: IMargin

    /**
     * 是否自动对齐
     * @todo 支持动态修改
     */
    _autoAlign: boolean = false

    // 布局算法
    structures: Record<string, any> = {}

    /**
     * 内部的临时仓库
     */
    cacheStorage: Record<string, any> = {}

    constructor(options: ILayoutControllerOptions) {
        this.board = options.board
        this._structure = options.structure || DEFAULT_STRUCTURE
        this._margin = options.margin;

        this.mindmap = options.mindmap;
        this._autoAlign = options.autoAlign || false;

        this.structures = {
            ...structures,
            ...options.structures
        }

        this.cacheStorage = {};
        // 开始布局
        this.doLayout();
    }

    get layoutMethod(): (this: ILayoutController, nodeVie: NodeView) => void {
        return this.structures[this._structure] || this.structures[DEFAULT_STRUCTURE]
    }

    get autoAlign() {
        return this._autoAlign
    }

    set autoAlign(flag) {
        if (flag !== this._autoAlign) {
            this._autoAlign = flag;
            this.doLayout();
        }
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