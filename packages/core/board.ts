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

import type { Doc } from '@ymindmap/state'
import { Command } from './command/type';

export type Options = {
    data?: string | Uint8Array;
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

    options: Record<string, any>;

    view: BoardView | null = null;

    commandManager: CommandManager;

    extensionManager: ExtensionManager;

    keymapBinding: Record<string, Command> = {};

    schema: Schema;

    stateUpdateHandler: () => void;

    private emitter = mitt<T & {
        change: string
    }>()

    constructor(options: Options) {
        this.options = options;
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
        // 注册schema
        this.schema = options.schema || new Schema({
            nodes: {}
        })
        Object.values(options.extensions || {}).forEach((extensionConfig) => {
            if (extensionConfig.addNodes) {
                const nodeTypes = extensionConfig.addNodes.call(this);
                Object.values(nodeTypes).forEach((nodeType) => {
                    this.schema.registerNode(nodeType);
                })
            }
        })
        this.stateUpdateHandler = () => {
            this.emitter.emit('change', this.toString() as any);
            this.extensionManager.invokeUpdate();
        }

        // 绑定commandMager
        this.commandManager = new CommandManager(this);

        // 绑定插件系统
        this.extensionManager = new ExtensionManager(this);
        this.extensionManager.registerExtension(this.options.extensions || {}, this.options);

        this.init(data);
    }

    init(data?: string | Uint8Array | Doc | undefined) {
        // 一些初始化的部分，可以重新初始化
        // 开始生成基础数据
        const yjsUpdate = typeof data === 'string' ? string2Yjs(data) : data;
        // 创建绑定view层
        if (this.view) {
            this.view.state.doc.off('update', this.stateUpdateHandler);
            this.view.destroy();
        }
        this.view = BoardView.create(
            State.create(yjsUpdate, {
                plugins: [],
                schema: this.schema
            }),
            this.theme,
            {
                width: this.options.width,
                height: this.options.height,
                container: this.options.container
            }
        )

        /**
         * chang事件绑定
         */
        this.view.state.doc.on('update', this.stateUpdateHandler);
        this.extensionManager.invokeCreate();
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
        return this.view?.state;
    }

    get commands() {
        return this.commandManager.commands;
    }

    get $anchor() {
        if (this.state) {
            const { empty, nodes } = this.state.$selection;
            return empty ? null : nodes[0];
        }
        return null;
    }

    get canvas() {
        if (this.view) return this.view.canvas;
        return null;
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
        if (this.state) return this.state.undoManager.undoStack.length;
        return 0;
    }

    get redoSize() {
        if (this.state) return this.state.undoManager.redoStack.length;
        return 0;
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
        this.state && this.state.undoManager.undo()
    }

    redo() {
        this.state && this.state.undoManager.redo()
    }

    toDataUrl(type: "jpg" | "png" | "webp" = 'png', quality?: number | undefined) {
        if (this.view) return this.view.toDataUrl(type, quality);
        return '';
    }

    /**
     * 转为svg的方法
     * @param options 
     * @returns 
     */
    toSvg() {
        if (this.view) return this.view.toSvg();
        return null;
    }

    getData() {
        return this.toString();
    }

    toString() {
        if (this.state) return yjs2string(this.state.doc);
        return ''
    }

    /**
     * 销毁的办法
     */
    destroy() {
        this.emitter.all.clear();
        this.extensionManager.invokeDestroy();
        // 销毁dom/数据层
        if (this.view) this.view.destroy();
    }
}