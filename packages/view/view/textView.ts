import { XmlText } from 'yjs'
import { View } from './view'
import type { Text } from 'leafer-ui'

export class TextView extends View<Text> {
    pointFromPos(pos: number) {
        return { object: this.canvasUI, offset: pos };
    }
    update() {
        // 自动更新文字内容
        if (this.canvasUI && this.node.state instanceof XmlText) {
            this.canvasUI.setAttr('text', this.node.state.toString())
            return true;
        }
        return false;
    }
}