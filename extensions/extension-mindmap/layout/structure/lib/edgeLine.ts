/**
 * 根据layerTree创建连接线
 * @todo 直线变曲线
 * @see https://www.zhangxinxu.com/wordpress/2023/02/js-curve-two-points/
 */
import { NodeView } from '@ymindmap/view';
import { Line, ChildEvent, DragEvent } from 'leafer-ui';
import { ILineData, IPointData } from '@leafer-ui/interface'
import type { ILayoutController } from '../../type'

export const CLASS_NAME = '_mindmap-edge-line_';

export function getClassName(from: NodeView, to: NodeView) {
    return `${CLASS_NAME}_${from.ui?.innerId} ${CLASS_NAME}_${to.ui?.innerId}`;
}

export interface IEdgeLineData extends Partial<ILineData> {
    from: NodeView,
    to: NodeView,
    isHorizontal: boolean,
}
export class EdgeLine extends Line {
    private _isHorizontal: boolean;
    private from: NodeView;
    private to: NodeView;
    private reconnect: () => void;

    constructor(options: IEdgeLineData) {
        super(options as any);
        this.from = options.from;
        this.to = options.to;
        this._isHorizontal = options.isHorizontal;
        this.reconnect = () => {
            const formBounds = this.from.bounds;
            const toBounds = this.to.bounds;

            // 根据上下左右，获取不同的坐标系
            if (this.isHorizontal) {
                this.y = formBounds.y + formBounds.height / 2;
                const toPoint: IPointData = {
                    x: 0,
                    y: toBounds.y + toBounds.height / 2 - this.y,
                }
                // 在左边的情况，to的右侧是连线点
                if ((formBounds.x + formBounds.width) < toBounds.x) {
                    this.x = formBounds.x + formBounds.width;
                    toPoint.x = toBounds.x - this.x;
                } else {
                    this.x = formBounds.x;
                    toPoint.x = toBounds.x + toBounds.width - this.x;
                }
                this.toPoint = toPoint;
            } else {
                return;
            }
        }

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
        .findOne(className.split(' ').map(lineClassName => `.${lineClassName}`).join()) as (Line | null);
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
        curve: 0.2,
        editable: true
    }));
}