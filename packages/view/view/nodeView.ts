import { XmlElement } from 'yjs'
import { BaseView } from './baseView'

export class NodeView extends BaseView<fabric.Object> {
    update() {
        if (this.fabricObject && this.node.state instanceof XmlElement) {
            // 更新fabric对象
            this.fabricObject.set(this.node.attributes);
            return true;
        }
        return false;
    }
}