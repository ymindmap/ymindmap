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
    UndoManager
} from 'yjs';
import { Schema, Node } from '@ymindmap/model';

export interface StateConfig {
    schema: Schema;
    doc: Doc;
    undoManager: UndoManager
    plugins?: unknown[];
    selected?: Node[];
    pluginState?: Record<string, any>
}

export class State {
    doc: Doc;

    schema: Schema;

    undoManager: UndoManager;

    selected: Node[] = [];

    pluginState: Record<string, any> = {};

    /** @todo 实现plugin系统 */
    readonly plugins: unknown[] = [];

    apply(tr: Transaction): State {
        applyUpdateV2(this.doc, encodeStateAsUpdateV2(tr.doc));
        const newState = new State({
            doc: tr.doc,
            schema: this.schema,
            plugins: this.plugins,
            undoManager: this.undoManager,
            selected: this.selected,
            pluginState: this.pluginState,
        });

        return newState;
    }

    get tr() {
        return this.doc.transact
    }

    get $selection() {
        return {
            nodes: this.selected,
            empty: this.selected.length === 0
        }
    }

    constructor(config: StateConfig) {
        this.doc = config.doc;
        this.undoManager = config.undoManager;
        this.schema = config.schema;
        this.plugins = config.plugins || [];
        this.selected = config.selected || [];
        this.pluginState = config.pluginState || {};
    }

    static create(data: Uint8Array, config: Omit<StateConfig, 'doc' | 'undoManager'>) {
        const doc = new Doc();
        const undoManager = new UndoManager(doc.getXmlFragment('default'));
        applyUpdateV2(doc, data);
        doc.once('updateV2', () => setTimeout(() => undoManager.clear()));

        return new State({
            schema: config.schema,
            plugins: config.plugins || [],
            doc,
            undoManager
        });
    }
}

