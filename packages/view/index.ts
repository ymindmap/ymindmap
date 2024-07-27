import { XmlElement } from 'yjs'
import { Leafer, App } from 'leafer-ui'
import '@leafer-in/view';
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

export class BoardView extends NodeView {
    state: State
    ui: Leafer
    app: App

    constructor(state: State, theme: Theme, options: ViewOptions = {}) {
        let rootState = state.doc.getXmlFragment('default').firstChild;
        if (!rootState) {
            rootState = new XmlElement(state.schema.topNodeType.name);
            state.doc.getXmlFragment('default').insert(0, [rootState]);
        }
        const node = state.schema.parseNode(rootState);
        if (!node || node.type !== state.schema.topNodeType) throw new Error('Can not init view with error topNodeType')

        const app = new App({
            view: options.container,
            fill: node.attributes.background || theme.background,
        })
        app.tree = app.addLeafer({
            type: 'design',
            ...options,
        });
        app.sky = app.addLeafer({ type: 'draw', usePartRender: false });

        const viewContext: NodeToCanvasContext = { render: app.tree as Leafer, theme };

        super(
            viewContext,
            node,
            node?.type.spec.toCanvas && node.type.spec.toCanvas(node, viewContext),
        );

        this.app = app;

        // 订阅state变化
        this.state = state;
        this.ui = this.app.tree as Leafer;
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
        return new BoardView(state, theme, options);
    }
}

export * from './theme'
export * from './view'
