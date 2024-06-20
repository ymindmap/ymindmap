import { topic, mindmap } from './schema'
import type { IExtensionConfig } from '@ymindmap/core'

export const MindmapExtension: IExtensionConfig = {
    addNodes() {
        return {
            topic,
            mindmap
        }
    },

    onCreate() {
        console.log(this)
    }
}

export default MindmapExtension;