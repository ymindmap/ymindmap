import { XmlElement, XmlText } from 'yjs';
import { NodeType } from './type';
import { Schema } from '../schema';
import type { IAttrs } from './attr.d';

export type INodeContent = Array<XmlElement | XmlText | Node> | XmlElement | XmlText | null;

/**
 * 一个基础的node
 * 作为定义转为yjs的代理
 */
// eslint-disable-next-line 
export class Node<T extends IAttrs = any> {
    type: NodeType;
    private xmlElement: XmlElement;
    constructor(
        type: NodeType,
        attrs: IAttrs = {},
        content: INodeContent = null,
        initXmlElement?: XmlElement
    ) {
        this.type = type;

        // 直接初始化
        if (initXmlElement) {
            this.xmlElement = initXmlElement;
            return this;
        }

        this.xmlElement = new XmlElement(this.type.name);
        Object.keys(attrs).forEach(key => {
            if (attrs[key]) this.xmlElement.setAttribute(key, attrs[key] as string);
        });
        if (content) {
            const list = Array.isArray(content) ? content : [content];
            this.xmlElement.insert(0, list.map(item => {
                if (item instanceof Node) return item.data;
                return item;
            }));
        }
    }

    get data() {
        return this.xmlElement;
    }

    get attributes(): T {
        return this.data.getAttributes() as T;
    }

    get depth() {
        const rootName = this.type.schema?.topNodeType.name;
        function getDepth(xmlElement: XmlElement, depth = 0) {
            if (!xmlElement.parent) return depth
            if (!(xmlElement.parent instanceof XmlElement)) return depth;
            if (xmlElement.parent.nodeName === rootName) return depth;
            return getDepth(xmlElement.parent, depth + 1);
        }
        return getDepth(this.data);
    }

    static parseFromXml(schemaOrType: NodeType | Schema, xml: XmlElement): Node {
        const type = schemaOrType instanceof Schema ? schemaOrType.nodes[xml.nodeName] : schemaOrType;
        if (!type) throw Error(`no node type ${xml.nodeName}`);
        return new Node(type, {}, null, xml);
    }
}