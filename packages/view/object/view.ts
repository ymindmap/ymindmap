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
    parent?: ObjectView | null = null
    constructor(options: ObjectViewConstructorOptions) {
        this.canvas = options.canvas;
        this.view = options.view as K;
        this.data = options.data as T;
        this.yoga = options.yoga;
        this.parent = options.parent;
        const layoutNode = options.yoga.Node.createDefault();
        this.layout = layoutNode;
        if (this.parent && this.parent.layout) {
            this.parent.children.push(this);
            if (this.parent.layout) {
                this.parent.layout.insertChild(this.layout, this.parent.layout.getChildCount());
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
    updateView(notifyParent = false) {
        if (!this.layout || !this.view) return;
        this.layout.calculateLayout(undefined, undefined);
        const { layout, view } = this;
        view.set({
            width: layout.getComputedWidth(),
            height: layout.getComputedHeight(),
            left: layout.getComputedTop(),
            top: layout.getComputedTop(),
        } as any)

        this.children.forEach(child => child.updateView());

        if (notifyParent && this.parent) this.parent.updateView(true);
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