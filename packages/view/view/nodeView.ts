import { XmlElement, XmlText } from 'yjs'
import { View } from './view'
import { TextView } from './textView'
import type { UI, Text } from 'leafer-ui'
import type { Node, NodeToCanvasContext } from '@ymindmap/model'

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
        if (this.canvasUI && this.node.state instanceof XmlElement) {
            // 更新 ui 对象 更新对应的attributes
            this.canvasUI.set(this.node.attributes);
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

    getMatrix(view: NodeView = this) {
        // 获取位置
        const { canvasUI } = view;
        if (canvasUI) {
            return {
                width: canvasUI.width as number,
                height: canvasUI.height as number,
                ...canvasUI.getWorldPoint({ x: 0, y: 0 })
            }
        }

        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    }
}