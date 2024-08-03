import { ScaleMenubar } from './scale';

import type { Board } from '@ymindmap/core';
import type { MenubarExtensionStorage } from '../type.d'
export function registerMenubar(board: Board, storage: MenubarExtensionStorage) {
    /**
     * 样式注册
     */
    if (!storage.style) {
        const style = document.createElement('style');
        style.innerHTML = `.ymindmap-menubar {
            padding: 8px;
            position: absolute;
            background: #ffffff;
            margin: 8px;
            box-shadow: 1px 1px 8px #eee;
        }`
        storage.style = style;
        document.head.appendChild(style);
    }

    /**
     * 开始注册对应的工具
     */
    const container: HTMLElement | undefined = board.view.canvas.parentView
    if (!container) return;
    const menubar: Record<string, HTMLElement | JSX.Element> = {
        scale: ScaleMenubar({
            board,
            map: storage.menubarDomMap,
        })
    }

    Object.entries(menubar).forEach(([name, dom]) => {
        const el = dom as HTMLElement;
        el.classList.add('ymindmap-menubar');
        container.appendChild(el);
        storage.menubarDomMap.set(name, el);
    })
}