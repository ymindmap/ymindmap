import { string2Yjs, getDefaultData, yjs2string } from '@ymindmap/core';
import { applyUpdateV2, Doc } from 'yjs'
import type { IExtensionConfig } from '@ymindmap/core'

export abstract class IProvider {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    on(event: 'synced', listener: (provider: IProvider) => void): void {

    }
}

export type CollabExtensionOptions = {
    defaultData: string,
    handlerYdoc: null | ((ydoc: Doc, callback: () => void) => IProvider)
}

export type CollabExtensionStorage = {
    provider: IProvider | null,
    isSynced: boolean
}

export const CollabExtension: IExtensionConfig<CollabExtensionOptions, CollabExtensionStorage> = {
    addOptions() {
        return {
            defaultData: getDefaultData(),
            handlerYdoc: null,
        }
    },
    addStorage() {
        return {
            provider: null,
            isSynced: false
        }
    },
    onBeforeCreate() {
        if (typeof this.options.handlerYdoc === 'function') {
            // 初始化自己的ydoc
            const doc = new Doc();
            // 同步后判断需不需要自动创建一个初始化数据
            const syncedCallback = () => {
                if (this.storage.isSynced) return
                const currentData = yjs2string(doc);
                const defaultTopNodeName = this.board.schema.topNodeType.name;
                const isNeedUseDefaultData = !currentData || currentData === `<${defaultTopNodeName}></${defaultTopNodeName}>`;
                if (isNeedUseDefaultData) {
                    if (typeof this.options.defaultData === 'string') applyUpdateV2(doc, string2Yjs(this.options.defaultData));
                }
                // 重新生成一次view
                this.board.init(doc);
                this.storage.isSynced = true;
            }
            this.storage.provider = this.options.handlerYdoc(doc, syncedCallback);
        }
    }
}

export default CollabExtension