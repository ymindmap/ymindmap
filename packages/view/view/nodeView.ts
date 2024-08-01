import { XmlElement, XmlText } from 'yjs'
import { View } from './view'
import { TextView } from './textView'
import { UI, Text } from 'leafer-ui'
import type { Node, NodeToCanvasContext } from '@ymindmap/model'

type Matrix = {
    x: number,
    y: number,
    width: number,
    height: number
}
export class NodeView extends View<UI> {
    constructor(
        context: NodeToCanvasContext,
        node: Node,
        ui?: UI | null,
        parent?: View | null
    ) {
        super(context, node, ui, parent);
        const state: XmlElement = this.node.state as XmlElement;

        // 填充子节点
        if (this.node.state as XmlElement) {
            state.forEach((childFragment) => this.createChildView(childFragment));
        }

        // 订阅自动更新子节点
        state.observe((e) => {
            let index = 0;
            if (e.delta) {
                for (const step of e.delta) {
                    if (!Number.isNaN(step.retain)) index = step.retain as number;
                    if (step.insert) {
                        const insertItems = Array.isArray(step.insert) ? step.insert : [step.insert];
                        insertItems.forEach((item, offset) => {
                            if (item instanceof XmlElement || item instanceof XmlText) {
                                this.createChildView(item, index + offset);
                            }
                        })
                    }
                }
            }
        });
    }

    createChildView(yFragment: XmlElement | XmlText, index = this.children.length) {
        const node = this.node.type.schema?.parseNode(yFragment);
        if (!node) return;

        const ui = node.type.spec.toCanvas && node.type.spec.toCanvas(
            node,
            this.context
        );

        const ChildViewConstructor = yFragment instanceof XmlText ? TextView : NodeView;

        this.children.splice(index, 0, new ChildViewConstructor(
            this.context,
            node,
            ui as Text, // TextView 是 Text 所以先改为any
            this
        ))
    }

    /**
     * 移除子节点
     * @param index 
     * @param size
     * @todo 完善方法 
     */
    removeChildView(index: number, size: number) {
        const list = this.children.splice(index, size);
        list.forEach(item => item.destroy());
    }

    getMatrix(inner?: boolean): Matrix {
        // 获取位置
        const { ui } = this;
        if (ui) {
            if (inner) return ui.boxBounds;
            return ui.worldBoxBounds;
        }

        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    }
}