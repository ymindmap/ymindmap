import { NodeType } from './type';
import { XmlElement } from 'yjs';
import type { IAttrs } from './attr';
export class Node extends XmlElement {
    type: NodeType;
    constructor(type, attrs: IAttrs) {
        super();
        this.type = type;
        Object.keys(attrs).forEach(key => {
            this.setAttribute(key, attrs[key]);
        })
    }

    get attrs() {
        return this.getAttributes();
    }

    get content() {
        return this.firstChild;
    }
}