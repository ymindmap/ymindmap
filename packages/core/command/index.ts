/**
 * 命令注册机制
 */
import type { View } from '@ymindmap/view';
import type {
    RawCommands
} from './type.d'

export class CommandManager {
    view: View;
    rawCommands: RawCommands = {}
    constructor(view: View, rawCommands: RawCommands = {}) {
        this.view = view;
        this.rawCommands = rawCommands
    }

    registerCommands(rawCommands: RawCommands) {
        this.rawCommands = { ...this.rawCommands, ...rawCommands };
    }

    get commands() {
        const { view } = this;
        const { state } = view;
        return Object.fromEntries(
            Object.entries(this.rawCommands)
                .map(([name, command]) => {
                    const method = (...args: any[]) => {
                        const callback = command(...args)(state, view);
                        return callback
                    }
                    return [name, method]
                })
        )
    }

    get state() {
        return this.view.state
    }
}