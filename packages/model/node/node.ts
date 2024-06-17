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
    private state: XmlElement | XmlText;
    constructor(
        type: NodeType,
        attrs: IAttrs = {},
        content: INodeContent = null,
        initState?: XmlElement | null
    ) {
        this.type = type;

        // 直接初始化
        if (initState) {
            this.state = initState;
        } else {
            if (typeof content === 'string') {
                this.state = new XmlText(content);
            } else {
                this.state = new XmlElement(this.type.name);
            }
        }

        if (this.state instanceof XmlElement) {
            Object.keys(attrs).forEach(key => {
                const value = attrs[key];
                if (value !== this.state.getAttribute(key)) {
                    if (value) {
                        this.state.setAttribute(key, value as string)
                    } else {
                        this.state.removeAttribute(key);
                    }
                }
            });
        }
        if (
            content !== null
            && this.state instanceof XmlElement
        ) {
            const list = Array.isArray(content) ? content : [content];
            const yContent = list.map(item => {
                if (item instanceof Node) return item.data;
                return typeof item === 'string' ? new XmlText(item) : item;
            })
            this.state.insert(0, yContent);

        }
    }

    get data() {
        return this.state;
    }

    get attributes(): T {
        return this.data.getAttributes() as T;
    }

    get depth() {
        const rootName = this.type.schema?.topNodeType.name;
        function getDepth(state: XmlElement | XmlText, depth = 0) {
            if (!state.parent) return depth
            if (!(state.parent instanceof XmlElement)) return depth;
            if (state.parent.nodeName === rootName) return depth;
            return getDepth(state.parent, depth + 1);
        }
        return getDepth(this.data);
    }

    get nodeSize() {
        return this.data.length;
    }
}