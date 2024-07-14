import { XmlElement, XmlText } from 'yjs'
import { View } from './view'
import { TextView } from './textView'
import type { UI, Text } from 'leafer-ui'
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

        // 填充子节点
        if (this.node.state instanceof XmlElement) {
            this.node.state.forEach((childFragment) => this.createChildView(childFragment));
        }
    }

    update() {
        if (this.ui && this.node.state instanceof XmlElement) {
            // 更新 ui 对象 更新对应的attributes
            this.ui.set(this.node.attributes);
            return true;
        }
        return false;
    }

    createChildView(yFragment: XmlElement | XmlText) {
        const node = this.node.type.schema?.parseNode(yFragment);
        if (!node) return;

        const ui = node.type.spec.toCanvas && node.type.spec.toCanvas(
            node,
            this.context
        );

        const ChildViewConstructor = yFragment instanceof XmlText ? TextView : NodeView;

        this.children.push(new ChildViewConstructor(
            this.context,
            node,
            ui as Text, // TextView 是 Text 所以先改为any
            this
        ))
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