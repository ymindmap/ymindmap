import { Node } from './node';
import { IAttrSpec, IAttrs } from './attr';
import type { fabric } from 'fabric'

export interface NodeSpec<
    K extends IAttrs = IAttrs
> {
    content?: string;

    group?: string;

    attrs?: {
        [key in keyof K]: IAttrSpec
    };

    selectable?: boolean;

    draggable?: boolean;

    toFabric?: (node: Node) => fabric.Object;
}