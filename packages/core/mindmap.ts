import { State, StateConfig } from '@ymindmap/state'
import { theme as defaultTheme, View } from '@ymindmap/view'
import mitt from 'mitt';

import { yjs2string, string2Yjs } from './bridge'

import type { Theme } from '@ymindmap/model'

export type Options = {
    data: string | Uint8Array;
    width?: number;
    height?: number;
    theme?: string;
    themeList?: { [key: string]: Theme };
} & Omit<StateConfig, 'doc' | 'activeClients'>

export class Mindmap {
    storage: {
        themeList: { [key: string]: Theme }
        [key: string]: unknown;
    } = { themeList: {} }

    themeName = 'default'

    view: View;

    private emitter = mitt<{
        change: string
    }>()

    constructor(options: Options) {
        const { data, theme, themeList } = options;
        this.themeName = theme || 'default';

        // 注册所有的theme
        this.storage = {
            ...this.storage,
            themeList: {
                ...themeList,
                ['default']: defaultTheme,
            }
        }
        const themeConfig = this.theme;

        // 开始生成基础数据
        const yjsUpdate = typeof data === 'string' ? string2Yjs(data) : data;

        // 创建绑定view层
        this.view = View.create(
            State.create(yjsUpdate, {
                plugins: [],
                schema: options.schema,
            }),
            themeConfig,
            {
                width: options.width,
                height: options.height,
            }
        )

        /**
         * chang事件绑定
         * @todo 如果有更多事件的话，迁移到统一绑定区域
         */
        this.state.doc.on('afterAllTransactions', () => this.emitter.emit('change', this.toString()))
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
        this.render();
    }

    get state() {
        return this.view.state;
    }

    get canvas() {
        return this.view.canvas;
    }

    get on() {
        return this.emitter.on
    }

    get off() {
        return this.emitter.off
    }

    toDataUrl(options: fabric.IDataURLOptions) {
        return this.view.toDataUrl(options)
    }

    /**
     * 转为svg的方法
     * @param options 
     * @returns 
     */
    toSvg(options: fabric.IToSVGOptions) {
        return this.view.toSvg(options)
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