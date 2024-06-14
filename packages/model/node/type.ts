import { Node, INodeContent } from './node';
import { NodeSpec } from './spec';
import { Schema } from '../schema'
import { IAttrs } from './attr';
import { XmlElement } from 'yjs';
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

    create(attrs: IAttrs = {}, content: INodeContent = null): Node {
        const nodeAttrs: IAttrs = Object
            .keys(this.spec.attrs || {})
            .reduce<IAttrs>((_attrs, key) => {
                if (!_attrs[key]) {
                    const attrSpec = this.spec.attrs || {};
                    if (attrSpec[key] && typeof attrSpec[key].default !== 'undefined') {
                        _attrs[key] = attrSpec[key].default as string;
                    }
                }
                return attrs;
            }, { ...attrs });
        return new Node(this, nodeAttrs, content);
    }

    parse(xml: XmlElement) {
        return Node.parseFromXml(this, xml);
    }

    static createNode<T extends NodeSpec = NodeSpec>(options: { name: string } & T) {
        return new NodeType<T>(options.name, options);
    }
}