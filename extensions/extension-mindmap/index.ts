import { topic, mindmap } from './schema'
import type { IExtensionConfig } from '@ymindmap/core'
import { loadYoga } from 'yoga-layout/load'

export const MindmapExtension: IExtensionConfig = {
    addNodes() {
        return {
            topic,
            mindmap
        }
    },

    addStorage() {
        return {
            yogeLayout: null
        }
    },

    onCreate() {
        console.log(this)
    }
}

export default MindmapExtension;