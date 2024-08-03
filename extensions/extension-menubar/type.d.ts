import type { Board } from '@ymindmap/core';
import type { StatelessProps } from 'tsx-create-element';

export type MenubarDomMap = Map<string, HTMLElement>
export type MenubarExtensionOptions = {
    enable: boolean
}

export type MenubarExtensionStorage = {
    enable: boolean,
    menubarDomMap: MenubarDomMap,
    style: HTMLStyleElement | null
}

export type MenubarProps = StatelessProps<{
    board: Board,
    map: MenubarDomMap
}>

export type MenubarRegister = (board: Board, map: MenubarDomMap) => HTMLElement