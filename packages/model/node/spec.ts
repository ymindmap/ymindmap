import { Node } from './node';
import { Leafer, UI } from 'leafer-ui';
import type { Theme } from '../theme'
import type { IAttrSpec, IAttrs } from './attr.d';

export type NodeToCanvasContext = {
    theme: Theme;
    render: Leafer;
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

    toCanvas?: (node: Node<K>, context: NodeToCanvasContext) => UI;
}