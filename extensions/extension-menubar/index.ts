import { registerMenubar } from './menubar';
import type { IExtensionConfig } from '@ymindmap/core'
import type { MenubarExtensionOptions, MenubarExtensionStorage } from './type.d'

export const MenubarExtension: IExtensionConfig<MenubarExtensionOptions, MenubarExtensionStorage> = {
    addOptions() {
        return {
            enable: false,
        }
    },
    addStorage() {
        const { options } = this;
        return {
            enable: options.enable,
            menubarDomMap: new Map(),
            style: null
        }
    },
    onCreate() {
        if (!document) return;
        const { board } = this;
        registerMenubar(board, this.storage);
    },

    onDestroy() {
        if (this.storage.style) {
            this.storage.style.parentElement?.removeChild(this.storage.style);
            this.storage.style = null;
        }
    }
}

export default MenubarExtension