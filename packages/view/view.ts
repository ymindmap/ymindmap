/**
 * yjs转fabric的部分
 */
import { XmlElement } from 'yjs'
import { fabric } from 'fabric'
import type { Theme } from '@ymindmap/model'
import type { State } from '@ymindmap/state'

/**
 * @todo 支持yoga
 */
export class View {
    state: State
    canvas: fabric.Canvas
    private theme: Theme
    private xmlElementFabricObjectMap: WeakMap<XmlElement, fabric.Object> = new WeakMap();
    constructor(state: State, theme: Theme) {
        // 订阅state变化
        this.state = state;
        this.theme = theme;

        this.canvas = new fabric.Canvas(null, {
            backgroundColor: this.theme.background
        });

        // 订阅转换
        this.state.doc.on('load', (doc) => {
            console.log(doc);
        })

        // 开始转换
        const root = this.state.doc.getXmlFragment('default').firstChild;
        if (root instanceof XmlElement && root.nodeName === this.schema.topNodeType.name) {
            this.drawXmlElement(root);
        } else {
            throw new Error('root is not topNodeType in schema')
        }

        // 第一次绘制
        this.renderAll();
    }

    drawXmlElement(xmlElement: XmlElement) {
        const node = this.schema.parseNode(xmlElement);
        if (!node) return;
        const fabricObject = node.type.spec.toFabric && node.type.spec.toFabric(node, this.theme);
        if (fabricObject) {
            this.canvas.add(fabricObject);

            this.xmlElementFabricObjectMap.set(xmlElement, fabricObject);
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
            // 重新绘制
            this.canvas.renderAll();
        }
    }

    get schema() {
        return this.state.schema;
    }

    static create(state: State, theme: Theme) {
        return new View(state, theme);
    }
}