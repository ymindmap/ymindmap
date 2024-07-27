import { string2Yjs, getDefaultData, yjs2string } from '@ymindmap/core';
import { applyUpdateV2 } from 'yjs'
import type { IExtensionConfig } from '@ymindmap/core'
import type { Doc } from 'yjs'

export abstract class IProvider {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    on(event: 'synced', listener: (provider: IProvider) => void): void {

    }
}

export type CollabExtensionOptions = {
    defaultData: string,
    handlerYdoc: null | ((ydoc: Doc) => IProvider)
}

export type CollabExtensionStorage = {
    provider: IProvider | null
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
            provider: null
        }
    },
    onCreate() {
        if (typeof this.options.handlerYdoc === 'function') {
            this.storage.provider = this.options.handlerYdoc(this.board.state.doc);
            // 同步后判断需不需要自动创建一个初始化数据
            const syncedCallback = () => {
                if (this.storage.provider && typeof Reflect.get(this.storage.provider, 'off') === 'function') {
                    Reflect.get(this.storage.provider, 'off').call(this.storage.provider, 'synced', syncedCallback);
                }
                const currentData = yjs2string(this.board.state.doc);
                const defaultTopNodeName = this.board.state.schema.topNodeType.name;
                const isNeedUseDefaultData = !currentData || currentData === `<${defaultTopNodeName}></${defaultTopNodeName}>`;
                if (isNeedUseDefaultData) {
                    if (typeof this.options.defaultData === 'string') applyUpdateV2(this.board.state.doc, string2Yjs(this.options.defaultData));
                }
                this.board.state.undoManager.clear();
            }
            if (this.storage.provider && typeof this.storage.provider.on === 'function') this.storage.provider.on('synced', syncedCallback);
        }
    }
}

export default CollabExtension