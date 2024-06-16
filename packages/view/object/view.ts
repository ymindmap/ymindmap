/**
 * 绑定 yoga/fabric/yjs的部分
 */
import type { fabric } from 'fabric';
import type { XmlElement, XmlText } from 'yjs';
import type Yoga from 'yoga-layout';
import type { Node as YogaNode } from 'yoga-layout';

export const FABRIC_OBJECT_VIEW_KEY = '__view__';

export type LayoutStyle = Partial<{
    paddingLeft: number
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    width: number
    height: number
}>

export type YogaNodeCallbackToFabricValue = () => fabric.Object[keyof fabric.Object]

export type ObjectViewConstructorOptions = {
    canvas: fabric.Canvas,
    yoga: typeof Yoga,
    view: fabric.Object,
    data: XmlElement | XmlText | null,
    parent: ObjectView | null,
    style?: LayoutStyle,
}

export class ObjectView<
    T extends XmlElement | XmlText = XmlElement,
    K extends fabric.Object = fabric.Object
> {
    canvas: fabric.Canvas | null = null
    yoga: typeof Yoga | null = null
    view: K | null = null
    layout: YogaNode | null = null
    data: T | null = null
    children: ObjectView<any>[] = []
    constructor(options: ObjectViewConstructorOptions) {
        this.canvas = options.canvas;
        this.view = options.view as K;
        this.data = options.data as T;
        this.yoga = options.yoga;
        const layoutNode = options.yoga.Node.create();
        this.layout = layoutNode;
        if (options.parent && options.parent.layout) {
            options.parent.children.push(this);
            if (options.parent.layout) {
                options.parent.layout.insertChild(this.layout, options.parent.layout.getChildCount());
            }
        }

        if (options.style) this.updateStyle(options.style);

        Reflect.set(this.view, FABRIC_OBJECT_VIEW_KEY, this);
    }

    updateStyle(style: LayoutStyle) {
        if (!this.yoga) return;
        Object.keys(style).forEach((key) => {
            const value = style[key as keyof LayoutStyle];
            if (typeof value === 'undefined') return;
            if (!this.yoga) return;
            switch (key as keyof LayoutStyle) {
                case 'paddingLeft': {
                    this.layout?.setPadding(this.yoga.EDGE_LEFT, value);
                    break;
                }
                case 'paddingRight': {
                    this.layout?.setPadding(this.yoga.EDGE_RIGHT, value);
                    break;
                }
                case 'paddingTop': {
                    this.layout?.setPadding(this.yoga.EDGE_TOP, value);
                    break;
                }
                case 'paddingBottom': {
                    this.layout?.setPadding(this.yoga.EDGE_BOTTOM, value);
                    break;
                }
                case 'width': {
                    this.layout?.setWidth(value);
                    break;
                }
                case 'height': {
                    this.layout?.setHeight(value);
                    break;
                }
                default: break;
            }
        })
    }

    /**
     * 更新自己的样式
     */
    updateView() {
        if (!this.layout || !this.view) return;
        this.layout.calculateLayout(undefined, undefined);
        const updateList: { prop: keyof fabric.Object, methodName: keyof YogaNode }[] = [
            { prop: 'width', methodName: 'getComputedWidth' },
            { prop: 'height', methodName: 'getComputedHeight' },
            { prop: 'left', methodName: 'getComputedLeft' },
            { prop: 'top', methodName: 'getComputedTop' }
        ]

        const { layout, view } = this;

        updateList.forEach(({ prop, methodName }) => {
            if (Reflect.has(layout, methodName)) {
                const value = (layout[methodName] as YogaNodeCallbackToFabricValue)();
                view.set(prop, value);
            };
        })
        this.children.forEach(child => child.updateView());
    }

    // 从canvas上进行移除
    destroy() {
        if (this.view) Reflect.deleteProperty(this.view, FABRIC_OBJECT_VIEW_KEY);
        this.yoga = null;
        this.children.forEach(child => child.destroy());
        this.children.splice(0);
        if (this.canvas && this.view) this.canvas.remove(this.view);
        this.canvas = null;
        this.view = null;
        this.layout && this.layout.free();
        this.layout = null;
    }
}