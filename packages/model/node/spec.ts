import { Node } from './node';
import type { Theme } from '../theme'
import type { IAttrSpec, IAttrs } from './attr.d';
import type { fabric } from 'fabric'
import type Yoga from 'yoga-layout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface NodeSpec<K extends IAttrs = any> {
    content?: string;

    group?: string;

    attrs?: {
        [key in keyof K]: IAttrSpec
    };

    selectable?: boolean;

    draggable?: boolean;

    toFabric?: (node: Node<K>, theme: Theme, yoga: typeof Yoga) => fabric.Object;
}