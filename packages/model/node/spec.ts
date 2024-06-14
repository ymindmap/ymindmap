import { Node } from './node';
import { IAttrSpec } from './attr';
export interface NodeSpec<T = Node, G = { [key: string]: IAttrSpec }, K = unknown> {
    content?: string;

    group?: string;

    attrs?: G;

    selectable?: boolean;

    draggable?: boolean;

    toFabric?: (node: T) => K;
}