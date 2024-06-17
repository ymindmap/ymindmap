import { Node, INodeContent } from './node';
import { NodeSpec } from './spec';
import { Schema } from '../schema'
import { XmlElement, XmlText } from 'yjs';
import type { IAttrs } from './attr.d';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class NodeType<T extends NodeSpec = NodeSpec> {
    name: string;
    schema: Schema | null = null;
    spec: T;

    constructor(name: string, spec: T) {
        this.name = name;
        this.spec = spec;
    }

    setSchema(schema: Schema): void {
        this.schema = schema;
    }

    create(
        attrs: IAttrs = {},
        content: INodeContent = null,
        initYFragment: XmlElement | XmlText | null = null
    ): Node {
        const nodeAttrs: IAttrs = Object
            .keys(this.spec.attrs || {})
            .reduce<IAttrs>((_attrs, key) => {
                if (!_attrs[key]) {
                    const attrSpec = this.spec.attrs || {};
                    if (attrSpec[key] && typeof attrSpec[key].default !== 'undefined') {
                        const defaultVal = attrSpec[key].default;
                        if (typeof defaultVal === 'function') {
                            _attrs[key] = defaultVal();
                        } else {
                            _attrs[key] = defaultVal as string;
                        }
                    }
                }
                return _attrs;
            }, { ...attrs });
        return new Node(this, nodeAttrs, content, initYFragment);
    }

    parse(xml: XmlElement | XmlText) {
        return this.create(xml.getAttributes(), null, xml);
    }

    static createNode<T extends NodeSpec>(options: { name: string } & T) {
        return new NodeType<T>(options.name, options);
    }
}