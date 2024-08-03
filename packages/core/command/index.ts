/**
 * 命令注册机制
 */
import type { Board } from '../board';
import type { BoardView } from '@ymindmap/view';
import type {
    RawCommands
} from './type.d'

export class CommandManager {
    board: Board;
    rawCommands: RawCommands = {}
    constructor(board: Board, rawCommands: RawCommands = {}) {
        this.board = board;
        this.rawCommands = rawCommands
    }

    registerCommands(rawCommands: RawCommands) {
        this.rawCommands = { ...this.rawCommands, ...rawCommands };
    }

    get commands() {
        const { view } = this;
        if (!view) return {};
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

    get view(): BoardView {
        return this.board.view
    }

    get state() {
        return this.view.state
    }
}