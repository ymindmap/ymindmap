import { Node } from './node';
import type { IAttrSpec, IAttrs } from './attr.d';
import type { fabric } from 'fabric'

export interface NodeSpec<K extends IAttrs = any> {
    content?: string;

    group?: string;

    attrs?: {
        [key in keyof K]: IAttrSpec
    };

    selectable?: boolean;

    draggable?: boolean;

    toFabric?: (node: Node<K>, storage: Map<string, any>) => fabric.Object;
}