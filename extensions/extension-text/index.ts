import { NodeType } from '@ymindmap/model';
import { fabric } from 'fabric';
import { XmlText } from 'yjs';
import type { IExtensionConfig } from '@ymindmap/core'

export const text = NodeType.createNode({
    name: 'text',
    toCanvas(node) {
        const text = node.state instanceof XmlText ? node.state.toString() : '';
        return new fabric.Text(text);
    }
})

export const TextMindmapExtension: IExtensionConfig = {
    addNodes() {
        return {
            text
        }
    }
}

export default TextMindmapExtension