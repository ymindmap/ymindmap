import { NodeType } from '@ymindmap/model';
import { fabric } from 'fabric';
import { XmlText } from 'yjs';

export const text = NodeType.createNode({
    name: 'text',
    toFabric(node) {
        const text = node.state instanceof XmlText ? node.state.toString() : '';
        return new fabric.Text(text);
    }
})

export default text;