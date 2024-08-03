/**
 * 普通js的入口
 */

import { Mindmap } from '@ymindmap/browser';
import { TextMindmapExtension } from '@ymindmap/extension-text'
import { MindmapExtension } from '@ymindmap/extension-mindmap'

import type { IExtensionConfig } from '@ymindmap/browser';
/**
 * 默认的Extensions
 */
const defaultExtensions: Record<string, IExtensionConfig> = {
    Text: TextMindmapExtension,
    Mindmap: MindmapExtension
}

export type MindmapOptions = {
    editable?: boolean
    data?: string | Uint8Array
    options?: Record<string, any>
    extensions?: Record<string, IExtensionConfig | false>
}

export function createMindmap(el: string | HTMLDivElement, options?: MindmapOptions) {
    const extensions: Record<string, IExtensionConfig> = { ...defaultExtensions };
    if (options?.extensions) {
        Object.entries(options.extensions).forEach(([extensionKey, extensionConfig]) => {
            if (!extensionConfig) Reflect.deleteProperty(extensions, extensionKey)
            else Reflect.set(extensions, extensionKey, extensionConfig)
        })
    }

    return new Mindmap({
        el,
        editable: options?.editable,
        data: options?.data,
        extensions,
        options: options?.options
    });
}

export default createMindmap;