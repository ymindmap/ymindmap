/**
 * 根据layerTree创建连接线
 * @todo 绘制上到下的线
 * @todo 支持其他连线模式
 * @see https://www.zhangxinxu.com/wordpress/2023/02/js-curve-two-points/
 */
import { NodeView } from '@ymindmap/view';
import { Path, ChildEvent, DragEvent } from 'leafer-ui';
import { IPathData, IPointData } from '@leafer-ui/interface'
import type { ILayoutController } from '../../type'

export const CLASS_NAME = '_mindmap-edge-line_';

export function getClassName(from: NodeView, to: NodeView) {
    return `${CLASS_NAME}_${from.ui?.innerId} ${CLASS_NAME}_${to.ui?.innerId}`;
}

export type IEdgeLineMode = 'curve' | 'direct' | 'corner' | 'bezier';

export function connectNodeView(this: EdgeLine) {
    const formBounds = this.from.bounds;
    const toBounds = this.to.bounds;
    const fromPoint: IPointData = { x: 0, y: 0 };
    const toPoint: IPointData = { x: 0, y: 0 };

    // 根据上下左右，获取不同的坐标系
    if (this.isHorizontal) {
        fromPoint.y = formBounds.y + formBounds.height / 2;
        toPoint.x = 0;
        toPoint.y = toBounds.y + toBounds.height / 2;
        // 在左边的情况，to的右侧是连线点
        if ((formBounds.x + formBounds.width) < toBounds.x) {
            fromPoint.x = formBounds.x + formBounds.width;
            toPoint.x = toBounds.x;
        } else {
            fromPoint.x = formBounds.x;
            toPoint.x = toBounds.x + toBounds.width;
        }
    } else {
        fromPoint.y = formBounds.y;
        toPoint.x = toPoint.x + toBounds.width / 2;
        toPoint.y = toBounds.y;
        // 在上方的状态下
        if ((formBounds.y + formBounds.height) < toBounds.y) {
            fromPoint.y = formBounds.y + formBounds.height;
            toPoint.y = toBounds.y;
        } else {
            fromPoint.y = formBounds.y;
            toPoint.y = toBounds.y + toBounds.height;
        }
    }

    // 开始连线
    this.pen.clearPath();
    // 创建直接连线
    this.pen.moveTo(fromPoint.x, fromPoint.y);

    switch (this.mode) {
        case 'curve': {
            // 计算控制点
            const controlPoint: IPointData = {
                x: (fromPoint.x + toPoint.x) / 2,
                y: (fromPoint.y + toPoint.y) / 2
            }

            if (this.isHorizontal) {
                controlPoint.x = fromPoint.x
            } else {
                controlPoint.y = fromPoint.y
            }

            this.pen.quadraticCurveTo(controlPoint.x, controlPoint.y, toPoint.x, toPoint.y)
            break;
        }
        case 'bezier': {
            // 计算控制点
            const controlPointA: IPointData = { x: 0, y: 0 };
            const controlPointB: IPointData = { x: 0, y: 0 };

            if (this.isHorizontal) {
                const y = (fromPoint.y + toPoint.y) / 2
                controlPointA.x = fromPoint.x;
                controlPointA.y = y;
                controlPointB.x = toPoint.x;
                controlPointB.y = y;
            }

            this.pen.bezierCurveTo(controlPointA.x, controlPointA.y, controlPointB.x, controlPointB.y, toPoint.x, toPoint.y);
            break;
        }
        case 'direct': {
            this.pen.lineTo(toPoint.x, toPoint.y);
            break;
        }
        case 'corner': {
            // 计算中间点然后直线转弯 @todo 在支持 其他布局时候修改
            this.pen.lineTo(toPoint.x, toPoint.y);
            break;
        }
        default: break;
    }
}

export interface IEdgeLineData extends Partial<IPathData> {
    from: NodeView,
    to: NodeView,
    isHorizontal: boolean,
    mode?: IEdgeLineMode
}
export class EdgeLine extends Path {
    private _isHorizontal: boolean;
    private _mode: IEdgeLineMode;
    public from: NodeView;
    public to: NodeView;
    private reconnect: () => void;

    constructor(options: IEdgeLineData) {
        super(options as any);
        this.from = options.from;
        this.to = options.to;
        this._isHorizontal = options.isHorizontal;
        this._mode = options.mode || 'curve';
        this.reconnect = connectNodeView.bind(this);

        [this.from.ui, this.to.ui].forEach(ui => {
            if (ui) {
                ui.on(DragEvent.DRAG, this.reconnect);
                ui.once(ChildEvent.DESTROY, () => ui.off(DragEvent.DRAG, this.reconnect));
            }
        })

        this.reconnect();
    }

    set isHorizontal(value) {
        this._isHorizontal = value;
        if (this.reconnect) this.reconnect();
    }

    get isHorizontal() {
        return this._isHorizontal;
    }

    set mode(value) {
        this._mode = value;
        if (this.reconnect) this.reconnect();
    }

    get mode() {
        return this._mode;
    }
}

/**
 * @todo 支持改样式
 * @param this 
 * @param from 
 * @param to 
 * @param isHorizontal 
 * @returns 
 */
export function createLine(this: ILayoutController, from: NodeView, to: NodeView, isHorizontal: boolean) {
    if (!from.ui || !to.ui) return;
    const className = getClassName(from, to);
    const { view } = this.board;

    const existedLine = view.ui
        .findOne(className.split(' ').map(lineClassName => `.${lineClassName}`).join()) as (EdgeLine | null);
    /**
     * 更新样式
     * @todo 样式系统
     */
    if (existedLine) return

    this.board.view.context.render.add(new EdgeLine({
        strokeWidth: 3,
        stroke: 'rgb(50,205,121)',
        className,
        zIndex: -1,
        isHorizontal,
        from,
        to,
        mode: 'curve'
    }));
}