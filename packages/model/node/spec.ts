import { Node } from './node';
import type { Theme } from '../theme'
import type { IAttrSpec, IAttrs } from './attr.d';
import type { fabric } from 'fabric'

export type NodeToFabricContext = {
    theme: Theme;
    canvas: fabric.Canvas;
}

// eslint-disable-next-line 
export interface NodeSpec<K extends IAttrs = any> {
    content?: string;

    group?: string;

    attrs?: {
        [key in keyof K]: IAttrSpec
    };

    selectable?: boolean;

    draggable?: boolean;

    toFabric?: (node: Node<K>, context: NodeToFabricContext) => fabric.Object;
}