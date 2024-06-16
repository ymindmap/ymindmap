import { State, StateConfig } from '@ymindmap/state'
import { theme as defaultTheme, View } from '@ymindmap/view'

import { yjs2string, string2Yjs } from './bridge'

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

    getData() {
        return this.toString();
    }

    toString() {
        return yjs2string(this.state.doc);
    }
}