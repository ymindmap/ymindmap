import { Node } from './node';
import { IAttrSpec } from './attr';
export abstract class NodeSpec<T = Node, G = { [key: string]: IAttrSpec }, K = unknown> {
    content?: string;

    group?: string;

    attrs?: G;

    selectable?: boolean = false;

    draggable?: boolean = false;

    toFabric: (node: T) => K;
}