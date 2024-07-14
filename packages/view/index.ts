import { XmlElement } from 'yjs'
import { Leafer, Debug } from 'leafer-ui'
import { NodeView } from './view/nodeView'
// import { VIEW_KEY } from './view/view'
import type { Theme, NodeToCanvasContext } from '@ymindmap/model'
import type { State } from '@ymindmap/state'
import type { LeaferCanvas } from 'leafer-ui'

export type ViewOptions = {
    width?: number,
    height?: number,
    debug?: boolean,
    container?: any
}

export class View extends NodeView {
    state: State
    constructor(state: State, theme: Theme, options: ViewOptions = {}) {
        let rootState = state.doc.getXmlFragment('default').firstChild;
        if (!rootState) {
            rootState = new XmlElement(state.schema.topNodeType.name);
            state.doc.getXmlFragment('default').insert(0, [rootState]);
        }
        const node = state.schema.parseNode(rootState);
        if (!node || node.type !== state.schema.topNodeType) throw new Error('Can not init view with error topNodeType')

        const leafer = new Leafer({
            type: 'design',
            view: options.container,
            fill: node.attributes.background || theme.background,
            ...options,
            width: options.width || 800,
            height: options.height || 600
        });

        if (options.debug) {
            Debug.enable = true;
            Debug.showRepaint = true
        }

        const viewContext: NodeToCanvasContext = { render: leafer, theme };

        super(
            viewContext,
            node,
            node?.type.spec.toCanvas && node.type.spec.toCanvas(node, viewContext),
        );

        // 订阅state变化
        this.state = state;
        this.ui = leafer; // 设置view对应的ui层

        // // 选区自动同步
        // const onCanvasSelectionChange = () => {
        //     this.state.selected = this.canvas.getActiveObjects()
        //         .map(item => {
        //             const view: NodeView | undefined = Reflect.get(item, VIEW_KEY);
        //             return view?.node;
        //         })
        //         .filter((item) => !!item) as Node[];
        // }
        // this.canvas.on('selection:cleared', onCanvasSelectionChange);
        // this.canvas.on('selection:created', onCanvasSelectionChange);
        // this.canvas.on('selection:updated', onCanvasSelectionChange);
    }

    get schema() {
        return this.state.schema;
    }

    get theme() {
        return this.context.theme
    }

    get canvas(): LeaferCanvas {
        return this.context.render.canvas as LeaferCanvas;
    }

    setTheme(theme: Theme) {
        if (theme !== this.theme) {
            this.context.theme = theme;
            // 重新绘制 需要所有节点重新绘制
            // this.canvas.renderAll();
        }
    }

    toDataUrl(type: "jpg" | "png" | "webp" = 'png', quality?: number) {
        return this.canvas.toDataURL(type, quality);
    }

    /**
     * 转为svg的方法
     */
    toSvg() {
        return this.canvas.export('svg')
    }

    destroy() {
        super.destroy();
        this.context.render.destroy();
    }

    static create(state: State, theme: Theme, options?: ViewOptions) {
        return new View(state, theme, options);
    }
}

export * from './theme'
export * from './view'
