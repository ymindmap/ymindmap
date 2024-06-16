/**
 * yjs转fabric的部分
 */
import { XmlElement } from 'yjs'
import { fabric } from 'fabric'
import { Yoga, loadYoga } from 'yoga-layout/load';
import { FABRIC_OBJECT_VIEW_KEY, ObjectView } from './object'
import type { Theme } from '@ymindmap/model'
import type { State } from '@ymindmap/state'

export type Options = {
    width?: number,
    height?: number
}

export class View {
    state: State
    canvas: fabric.Canvas
    private theme: Theme
    private yoga: Yoga | null = null;
    constructor(state: State, theme: Theme, options: Options = {}) {
        // 订阅state变化
        this.state = state;
        this.theme = theme;

        this.canvas = new fabric.Canvas(null, {
            backgroundColor: this.theme.background,
            ...options
        });
        // 禁止group的时候拥有control
        fabric.Group.prototype.hasControls = false;

        this.bindAwareness();
        // 加载yoga进行排版
        loadYoga()
            .then((yoga) => {
                this.yoga = yoga;
                // 开始转换
                const root = this.state.doc.getXmlFragment('default').firstChild;
                if (root instanceof XmlElement && root.nodeName === this.schema.topNodeType.name) {
                    this.drawXmlElement(root);
                } else {
                    throw new Error('root is not topNodeType in schema')
                }

                // 第一次绘制
                this.renderAll();
            })
            .catch((e) => {
                throw e;
            })
    }

    get schema() {
        return this.state.schema;
    }

    bindAwareness() {
        /**
         * 订阅当前选中节点
         */
        const onCanvasSelectionChange = () => {
            const selectedObjects = this.canvas.getActiveObjects()
                .map(item => {
                    const viewObject: ObjectView | undefined = Reflect.get(item, FABRIC_OBJECT_VIEW_KEY);
                    return viewObject?.data
                }).filter((item) => item)
            this.state.updateAwareness('selectedObjects', selectedObjects);
        }
        this.canvas.on('selection:cleared', onCanvasSelectionChange);
        this.canvas.on('selection:created', onCanvasSelectionChange);
        this.canvas.on('selection:updated', onCanvasSelectionChange);
    }

    drawXmlElement(xmlElement: XmlElement) {
        const node = this.schema.parseNode(xmlElement);
        if (!node) return;
        if (!this.yoga) throw new Error('yoga is not init');
        const fabricObject = node.type.spec.toFabric && node.type.spec.toFabric(
            node,
            this.theme,
            {
                yoga: this.yoga,
                canvas: this.canvas,
            }
        );
        if (fabricObject) {
            // 设置选择框属性
            fabricObject.set('borderScaleFactor', 4);
            fabricObject.set('padding', 2);
            fabricObject.set('hasControls', false);

            this.canvas.add(fabricObject);
        }

        xmlElement.forEach(child => {
            if (child instanceof XmlElement) this.drawXmlElement(child);
        })
    }

    renderAll() {
        this.canvas.requestRenderAll();
    }

    setTheme(theme: Theme) {
        if (theme !== this.theme) {
            this.theme = theme;
            // 重新绘制 需要所有节点重新绘制
            this.canvas.renderAll();
        }
    }

    toDataUrl(options: fabric.IDataURLOptions) {
        return this.canvas.toDataURL(options)
    }

    /**
     * 转为svg的方法
     * @todo 现在是
     * @param options 
     * @returns 
     */
    toSvg(options: fabric.IToSVGOptions) {
        return this.canvas.toSVG(options)
    }

    destroy() {
        this.canvas.dispose();
    }

    static create(state: State, theme: Theme, options?: Options) {
        return new View(state, theme, options);
    }
}