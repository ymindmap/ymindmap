import { State, StateConfig } from '@ymindmap/state'
import { theme as defaultTheme, View } from '@ymindmap/view'

import { yjs2string, string2Yjs } from './bridge'
import { bindEvent } from './helper/events'

import type { Theme } from '@ymindmap/model'

export type Options = {
    data: string | Uint8Array;
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

    private dom: unknown = null;

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
            themeConfig
        )
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

    /**
     * 生成domElement
     * @todo 考虑销毁相关问题
     */
    getElement() {
        if (this.dom) return this.dom;
        // 自动生成绑定的dom元素
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.dom = (this.canvas as unknown as any).wrapperEl;
        /**
         * @todo 迁移为单独方法
         */
        bindEvent(this.canvas, { minZoom: 0.1, maxZoom: 3 });

        return this.dom;
    }

    toString() {
        return yjs2string(this.state.doc);
    }
}