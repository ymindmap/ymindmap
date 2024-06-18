/**
 * 基于yjs
 * Doc, Transaction的状态管理
 * 参考了prosemirror的api接口实现
 */
import {
    Transaction,
    Doc,
    applyUpdateV2,
    encodeStateAsUpdateV2,
    XmlElement
} from 'yjs';
import { Schema } from '@ymindmap/model';

export type Awareness = {
    selectedObjects: XmlElement[],
    [key: string]: any
}

export type Command = (
    doc: Doc,
) => boolean

export interface StateConfig {
    schema: Schema;
    doc: Doc;
    awareness?: Awareness, // 感知数据
    plugins?: unknown[];
}

export class State {
    doc: Doc;
    /** 选中的id */
    awareness: Awareness;

    schema: Schema;

    commands: {
        [key: string]: Command;
    } = {};

    /** @todo 实现plugin系统 */
    readonly plugins: unknown[] = [];

    apply(tr: Transaction): State {
        applyUpdateV2(this.doc, encodeStateAsUpdateV2(tr.doc));
        const newState = new State({
            doc: tr.doc,
            schema: this.schema,
            plugins: this.plugins,
            awareness: {
                selectedObjects: []
            }
        });
        newState.commands = this.commands;

        return newState;
    }

    updateAwareness(key: keyof Awareness, value: any) {
        this.awareness[key] = value;
    }

    tr() {
        return new Transaction(this.doc, null, true);
    }

    constructor(config: StateConfig) {
        this.doc = config.doc;
        this.schema = config.schema;
        this.plugins = config.plugins || [];
        this.awareness = config.awareness || {
            selectedObjects: []
        };
    }

    registerCommand(key: string, command: Command) {
        this.commands[key] = () => command(this.doc);
    }

    static create(data: Uint8Array, config: Omit<StateConfig, 'doc'>) {
        const doc = new Doc();
        applyUpdateV2(doc, data);
        return new State({
            schema: config.schema,
            plugins: config.plugins || [],
            awareness: {
                selectedObjects: []
            },
            doc
        });
    }
}