import { XmlText } from 'yjs'
import { View } from './view'
import type { Text } from 'leafer-ui'

export class TextView extends View<Text> {
    pointFromPos(pos: number) {
        return { object: this.ui, offset: pos };
    }
    update() {
        // 自动更新文字内容
        if (this.ui && this.node.state instanceof XmlText) {
            this.ui.setAttr('text', this.node.state.toString())
            return true;
        }
        return false;
    }
}