import type { NodeType } from '@ymindmap/model';
import type { Board } from '../board';
import type {
    RawCommands
} from '../command/type.d'

export interface IExtensionConfig<IOptions = any, IStorage = any> {
    // 注册命令
    addCommands?: (extension: Extension<IOptions, IStorage>) => RawCommands

    addNodes?: () => Record<string, NodeType>

    addOptions?: () => Record<string, any>

    addStorage?: () => Record<string, any>

    onCreate?: (this: Extension<IOptions, IStorage>, board: Board) => void;

    onUpdate?: (this: Extension<IOptions, IStorage>, board: Board) => void;
}

export type IExtensionOptions = IExtensionConfig & {
    name: string,
    board: Board
}

export class Extension<IOptions = Record<string, any>, IStorage = Record<string, any>> {
    name: string
    board: Board
    options: IOptions = {} as any
    storage: IStorage = {} as any

    constructor(options: IExtensionOptions, boardOptions: Record<string, any>) {
        this.board = options.board
        this.name = options.name
        this.options = Reflect.get((boardOptions.options || {}), options.name)
        if (options.addOptions) {
            this.options = {
                ...options.addOptions(),
                ...this.options
            }
        }

        if (options.addStorage) {
            this.storage = options.addStorage() as any;
        }

        if (options.addCommands && this.board.commandManager) {
            this.board.commandManager.registerCommands(options.addCommands(this))
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
    onUpdateCallbackList: ({
        name: string,
        callback: (this: Extension, board: Board) => void
    })[] = []

    constructor(board: Board) {
        this.board = board;
    }

    onUpdate() {
        const { extensions } = this;
        this.onUpdateCallbackList.forEach(({
            name,
            callback
        }) => {
            const extensionInstance = extensions[name];
            if (extensionInstance) callback.call(extensionInstance, this.board)
        });
    }

    get extensions() {
        return Object.fromEntries(this._extension.map((extension) => [extension.name, extension]))
    }

    registerExtension(extensions: Record<string, IExtensionConfig>, defaultOptions: Record<string, any>) {
        Object.entries(extensions).forEach(([name, extensionConfig]) => {
            const extensionInstance = Extension.create({ ...extensionConfig, name, board: this.board }, defaultOptions);
            this._extension.push(extensionInstance)
            if (extensionConfig.onUpdate) {
                this.onUpdateCallbackList.push({
                    name,
                    callback: extensionConfig.onUpdate
                });
            }

            if (extensionConfig.onCreate) extensionConfig.onCreate.call(extensionInstance, this.board);
        })
    }
}