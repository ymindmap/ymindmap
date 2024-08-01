/**
 * @see https://github.com/ProseMirror/prosemirror-keymap/blob/master/src/keymap.ts
 * 一个绑定快捷键的系统
 */
import { keyName } from "w3c-keyname"
import { isMac } from '../utils'

import type { Command, Board } from '@ymindmap/core'
import type { IKeyEvent } from '@leafer-ui/interface';

const mac = isMac();

function normalizeKeyName(name: string) {
    const parts = name.split(/-(?!$)/)
    let result = parts[parts.length - 1]
    if (result == "Space") result = " "
    let alt, ctrl, shift, meta
    for (let i = 0; i < parts.length - 1; i++) {
        const mod = parts[i]
        if (/^(cmd|meta|m)$/i.test(mod)) meta = true
        else if (/^a(lt)?$/i.test(mod)) alt = true
        else if (/^(c|ctrl|control)$/i.test(mod)) ctrl = true
        else if (/^s(hift)?$/i.test(mod)) shift = true
        else if (/^mod$/i.test(mod)) { if (mac) meta = true; else ctrl = true }
        else throw new Error("Unrecognized modifier name: " + mod)
    }
    if (alt) result = "Alt-" + result
    if (ctrl) result = "Ctrl-" + result
    if (meta) result = "Meta-" + result
    if (shift) result = "Shift-" + result
    return result
}

function normalize(map: { [key: string]: Command }) {
    const copy: { [key: string]: Command } = Object.create(null)
    for (const prop in map) copy[normalizeKeyName(prop)] = map[prop]
    return copy
}

function modifiers(name: string, event: IKeyEvent, shift = true) {
    if (event.altKey) name = "Alt-" + name
    if (event.ctrlKey) name = "Ctrl-" + name
    if (event.metaKey) name = "Meta-" + name
    if (shift && event.shiftKey) name = "Shift-" + name
    return name
}

export function keydownHandler(
    bindings: { [key: string]: Command },
    board: Board
): (event: IKeyEvent) => boolean {
    const map = normalize(bindings);
    return function (event) {
        const name = keyName(event as unknown as Event)
        const direct = map[modifiers(name, event)]
        if (direct && direct(board.state as any, board.view as any)) {
            if (event.origin instanceof Event) event.origin.preventDefault();
            return true;
        }
        // A character key
        if (name.length == 1 && name != " ") {
            if (event.shiftKey) {
                // In case the name was already modified by shift, try looking
                // it up without its shift modifier
                const noShift = map[modifiers(name, event, false)]
                if (noShift && noShift(board.state as any, board.view as any)) {
                    if (event.origin instanceof Event) event.origin.preventDefault();
                    return true;
                }
            }
            if (event.shiftKey || event.altKey || event.metaKey || name.charCodeAt(0) > 127) {
                // Try falling back to the keyCode when there's a modifier
                // active or the character produced isn't ASCII, and our table
                // produces a different name from the the keyCode. See #668,
                // #1060
                const fromCode = map[modifiers(name, event)]
                if (fromCode && fromCode(board.state as any, board.view as any)) {
                    if (event.origin instanceof Event) event.origin.preventDefault();
                    return true
                }
            }
        }
        return false
    }
}