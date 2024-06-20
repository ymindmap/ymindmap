import { XmlText } from 'yjs'
import { View } from './view'

export class TextView extends View<fabric.Text> {
    pointFromPos(pos: number) {
        return { object: this.fabricObject, offset: pos };
    }
    update() {
        // 自动更新fabric的文字内容
        if (this.fabricObject && this.node.state instanceof XmlText) {
            this.fabricObject.set('text', this.node.state.toString())
            return true;
        }
        return false;
    }
}