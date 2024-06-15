/**
 * 基于yjs
 * Doc, Transaction的状态管理
 * 参考了prosemirror的api接口实现
 */
import { Transaction, Doc, ID, applyUpdateV2, encodeStateAsUpdateV2 } from 'yjs';
import { Schema } from '@ymindmap/model';

export interface StateConfig {
    schema: Schema;
    doc: Doc;
    activeClients?: Set<ID>;
    plugins?: unknown[];
}

export class State {
    doc: Doc;
    /** 选中的id */
    activeClients: Set<ID> = new Set<ID>();

    schema: Schema;

    /** @todo 实现plugin系统 */
    readonly plugins: unknown[] = [];

    apply(tr: Transaction): State {
        applyUpdateV2(this.doc, encodeStateAsUpdateV2(tr.doc));
        return new State({
            doc: tr.doc,
            schema: this.schema,
            activeClients: this.activeClients,
            plugins: this.plugins
        });
    }

    tr() {
        return new Transaction(this.doc, null, true);
    }

    constructor(config: StateConfig) {
        this.doc = config.doc;
        this.schema = config.schema;
        this.activeClients = config.activeClients || new Set<ID>();
        this.plugins = config.plugins || [];
    }

    static create(data: Uint8Array, config: Omit<StateConfig, 'doc'>) {
        const doc = new Doc();
        applyUpdateV2(doc, data);
        return new State({
            schema: config.schema,
            activeClients: config.activeClients || new Set<ID>(),
            plugins: config.plugins || [],
            doc
        });
    }
}