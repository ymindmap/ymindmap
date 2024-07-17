/**
 * 画板
 * 一切的入口
 * @todo themeList判断是否要作为插件
 */
import { State } from '@ymindmap/state'
import { theme as defaultTheme, BoardView } from '@ymindmap/view'
import mitt, { EventType } from 'mitt';
import { CommandManager } from './command/index';
import { ExtensionManager, IExtensionConfig } from './extension';

import { yjs2string, string2Yjs } from './bridge'

import { Schema, type Theme } from '@ymindmap/model'

export type Options = {
    data: string | Uint8Array;
    width?: number;
    height?: number;
    theme?: string;
    themeList?: { [key: string]: Theme };
    options?: Record<string, any>;
    extensions?: Record<string, IExtensionConfig>
    container?: any
} & {
    schema?: Schema;
    debug?: boolean;
}

export class Board<T extends Record<EventType, unknown> = any> {
    _storage: {
        themeList: { [key: string]: Theme }
        [key: string]: unknown;
    } = { themeList: {} }

    themeName = 'default'

    view: BoardView;

    commandManager: CommandManager;

    extensionManager: ExtensionManager;

    private emitter = mitt<T & {
        change: string
    }>()

    constructor(options: Options) {
        const { data, theme, themeList } = options;
        this.themeName = theme || 'default';

        // 注册所有的theme
        this._storage = {
            ...this._storage,
            themeList: {
                ...themeList,
                ['default']: defaultTheme,
            }
        }
        const themeConfig = this.theme;

        // 开始生成基础数据
        const yjsUpdate = typeof data === 'string' ? string2Yjs(data) : data;

        // 注册schema
        const schema = options.schema || new Schema({
            nodes: {}
        })
        Object.values(options.extensions || {}).forEach((extensionConfig) => {
            if (extensionConfig.addNodes) {
                const nodeTypes = extensionConfig.addNodes();
                Object.values(nodeTypes).forEach((nodeType) => {
                    schema.registerNode(nodeType);
                })
            }
        })

        // 创建绑定view层
        this.view = BoardView.create(
            State.create(yjsUpdate, {
                plugins: [],
                schema
            }),
            themeConfig,
            {
                width: options.width,
                height: options.height,
                container: options.container
            }
        )

        // 绑定commandMager
        this.commandManager = new CommandManager(this.view);

        // 绑定插件系统
        this.extensionManager = new ExtensionManager(this);
        this.extensionManager.registerExtension(options.extensions || {}, options);

        /**
         * chang事件绑定
         */
        this.state.doc.on('update', () => {
            this.emitter.emit('change', this.toString() as any)
            this.extensionManager.onUpdate()
        })
    }

    get theme(): Theme {
        const themeList = this.storage.themeList;
        return themeList[this.themeName] || defaultTheme;
    }

    set theme(value: string | Theme) {
        if (typeof value === 'string') {
            this.themeName = value;
        } else {
            const themeList = this.storage.themeList;
            const themeName = Object.keys(themeList).find((themeName) => themeList[themeName] === value);
            if (themeName) {
                this.themeName = themeName;
            }
            else {
                const randomId = Math.random().toString(36);
                this.storage.themeList[randomId] = value;
                this.themeName = randomId;
            }
        }
    }

    get state() {
        return this.view.state;
    }

    get commands() {
        return this.commandManager.commands;
    }

    get $anchor() {
        const { empty, nodes } = this.state.$selection;
        return empty ? null : nodes[0];
    }

    get canvas() {
        return this.view.canvas;
    }

    get on() {
        return this.emitter.on
    }

    get emit() {
        return this.emitter.emit
    }

    get off() {
        return this.emitter.off
    }

    get undoSize() {
        return this.state.undoManager.undoStack.length;
    }

    get redoSize() {
        return this.state.undoManager.redoStack.length;
    }

    get storage() {
        if (this.extensionManager) return {
            ...this._storage,
            ...Object.fromEntries(
                Object.entries(this.extensionManager.extensions).map(([key, value]) => {
                    return [key, value.storage]
                })
            )
        }
        return this._storage
    }

    undo() {
        this.state.undoManager.undo()
    }

    redo() {
        this.state.undoManager.redo()
    }

    toDataUrl(type: "jpg" | "png" | "webp" = 'png', quality?: number | undefined) {
        return this.view.toDataUrl(type, quality)
    }

    /**
     * 转为svg的方法
     * @param options 
     * @returns 
     */
    toSvg() {
        return this.view.toSvg()
    }

    getData() {
        return this.toString();
    }

    toString() {
        return yjs2string(this.state.doc);
    }

    /**
     * 销毁的办法
     */
    destroy() {
        this.emitter.all.clear();
        // 销毁dom/数据层
        this.view.destroy();
    }
}