import { NodeType } from '@ymindmap/model';
import { Text } from 'leafer-ui';
import { XmlText } from 'yjs';
import type { IExtensionConfig } from '@ymindmap/core'

export const text = NodeType.createNode({
    name: 'text',
    toCanvas(node) {
        const text = node.state instanceof XmlText ? node.state.toString() : '';
        return new Text({ text });
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