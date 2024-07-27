import { XmlElement, XmlText } from 'yjs';
import { NodeType } from './type';
import type { IAttrs } from './attr.d';

export type INodeContent = Array<XmlElement | XmlText | Node> | XmlElement | XmlText | string | null;

/**
 * 一个基础的node
 * 作为定义转为yjs的代理
 */
// eslint-disable-next-line 
export class Node<T extends IAttrs = any> {
    type: NodeType;
    private _yAbstractType: XmlElement | XmlText;
    constructor(
        type: NodeType,
        attrs: IAttrs = {},
        content: INodeContent = null,
        initState?: XmlElement | XmlText | null
    ) {
        this.type = type;

        // 直接初始化
        if (initState) {
            this._yAbstractType = initState;
        } else {
            if (typeof content === 'string') {
                this._yAbstractType = new XmlText(content);
            } else {
                this._yAbstractType = new XmlElement(this.type.name);
            }
        }

        if (this._yAbstractType instanceof XmlElement) {
            Object.keys(attrs).forEach(key => {
                const value = attrs[key];
                if (value !== this._yAbstractType.getAttribute(key)) {
                    if (value) {
                        this._yAbstractType.setAttribute(key, value as string)
                    } else {
                        this._yAbstractType.removeAttribute(key);
                    }
                }
            });
        }
        if (
            content !== null
            && this._yAbstractType instanceof XmlElement
        ) {
            const list = Array.isArray(content) ? content : [content];
            const yContent = list.map(item => {
                if (item instanceof Node) return item.state;
                return typeof item === 'string' ? new XmlText(item) : item;
            })
            this._yAbstractType.insert(0, yContent);

        }

        Node.NodeStateMap.set(this.state, this);
    }

    get state() {
        return this._yAbstractType;
    }

    get attributes(): T {
        return this.state.getAttributes() as T;
    }

    get depth() {
        const rootName = this.type.schema?.topNodeType.name;
        function getDepth(state: XmlElement | XmlText, depth = 0) {
            if (!state.parent) return depth
            if (!(state.parent instanceof XmlElement)) return depth;
            if (state.parent.nodeName === rootName) return depth;
            return getDepth(state.parent, depth + 1);
        }
        return getDepth(this.state);
    }

    get nodeSize() {
        return this.state.length;
    }

    get children(): Array<Node<any>> {
        if (this.state instanceof XmlText) return [];
        const children: Array<Node<any>> = [];
        this.state.forEach(child => {
            const node = Node.NodeStateMap.get(child);
            if (node) children.push(node)
        })
        return children;
    }

    get setAttribute() {
        return this.state.setAttribute.bind(this.state);
    }

    static NodeStateMap = new WeakMap<XmlElement | XmlText, Node<any>>()
}