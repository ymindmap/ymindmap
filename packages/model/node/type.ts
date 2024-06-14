import { Node } from './node';
import { NodeSpec } from './spec';
import type { IAttrs } from './attr';
export class NodeType<T extends NodeSpec = NodeSpec> {
    name: string;

    // schema?: any;

    spec: T;

    constructor(name: string, spec: T) {
        this.name = name;
        this.spec = spec;
    }

    create(attrs: IAttrs): Node {
        const nodeAttrs: IAttrs = Object
            .keys(this.spec.attrs || {})
            .reduce<IAttrs>((_attrs, key) => {
                if (!_attrs[key]) {
                    const attrSpec = this.spec.attrs || {};
                    if (attrSpec[key] && typeof attrSpec[key].default!== 'undefined') {
                        _attrs[key] = attrSpec[key].default;
                    }
                }
                return attrs;
            }, { ...attrs });
        return new Node(this, nodeAttrs);
    }
}