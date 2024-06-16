import { Node } from './node';
import type { Theme } from '../theme'
import type { IAttrSpec, IAttrs } from './attr.d';
import type { fabric } from 'fabric'
import type Yoga from 'yoga-layout';

export type ToFabricContext = {
    yoga: typeof Yoga,
    canvas: fabric.Canvas,
    // eslint-disable-next-line 
    [key: string]: any
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

    toFabric?: (node: Node<K>, theme: Theme, context: ToFabricContext) => fabric.Object;
}