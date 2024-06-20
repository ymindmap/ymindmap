import type { NodeType } from '@ymindmap/model';
import type { Board } from '../board';
import type {
    RawCommands
} from '../command/type.d'

export interface IExtensionConfig {
    // 注册命令
    addCommands?: () => RawCommands

    addNodes?: () => Record<string, NodeType>

    addOptions?: () => Record<string, any>

    addStorage?: () => Record<string, any>

    onCreate?: () => void;

    onUpdate?: () => void;
}

export type IExtensionOptions = IExtensionConfig & {
    name: string,
    board: Board
}

export class Extension {
    name: string
    board: Board
    options: Record<string, any> = {}
    storage: Record<string, any> = {}

    constructor(options: IExtensionOptions, boardOptions: Record<string, any>) {
        this.board = options.board
        this.name = options.name
        this.options = Reflect.get((boardOptions || {}), options.name)
        if (options.addOptions) {
            this.options = {
                ...options.addOptions(),
                ...this.options
            }
        }

        if (options.addStorage) {
            this.storage = options.addStorage();
        }

        if (options.addCommands) {
            this.board.commandManager && this.board.commandManager.registerCommands(options.addCommands())
        }
    }

    static create(options: IExtensionOptions, boardOptions: Record<string, any>) {
        return new Extension(options, boardOptions);
    }
}

export class ExtensionManager {
    board: Board;
    _extension: Extension[] = [];

    // 缓存的callback列表
    onUpdateCallbackList: (() => void)[] = []

    constructor(board: Board) {
        this.board = board;
    }

    onUpdate() {
        this.onUpdateCallbackList.forEach((callback) => callback());
    }

    get extensions() {
        return Object.fromEntries(this._extension.map((extension) => [extension.name, extension]))
    }

    registerExtension(extensions: Record<string, IExtensionConfig>, defaultOptions: Record<string, any>) {
        Object.entries(extensions).forEach(([name, extensionConfig]) => {
            this._extension.push(Extension.create({ ...extensionConfig, name, board: this.board }, defaultOptions))
            if (extensionConfig.onUpdate) {
                this.onUpdateCallbackList.push(extensionConfig.onUpdate);
            }

            if (extensionConfig.onCreate) extensionConfig.onCreate();
        })
    }
}