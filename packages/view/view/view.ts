/**
 * view
 */
import { Node, NodeToCanvasContext } from '@ymindmap/model'
import type { UI } from 'leafer-ui'
import type { IBoundsData } from '@leafer-ui/interface'
import { YXmlEvent } from 'yjs';

export const VIEW_KEY = '__Y_MINDMAP_VIEW__'

export class View<T extends UI = UI> {
    context: NodeToCanvasContext;
    node: Node;
    ui: T | null;
    parent: null | View;
    children: View[];

    constructor(
        context: NodeToCanvasContext,
        node: Node,
        ui?: T | null,
        parent?: View | null
    ) {
        this.context = context;
        this.node = node;
        this.ui = ui || null;
        this.parent = parent || null;
        this.children = []

        if (this.ui) {
            Reflect.set(this.ui, VIEW_KEY, this);
            this.context.render.add(this.ui);
        }

        // 订阅更新移除自己的子节点
        this.node.state.observe((e) => {
            if (e instanceof YXmlEvent) {
                // 监听到更新啦
                console.log(e);
                // 内容更新
                if (e.attributesChanged.size) {
                    this.ui?.forceUpdate();
                }
            } else {
                // 刷新自己
                // 监听到更新啦
                console.log(e);
            }
        })

        View.NodeViewMap.set(this.node, this);
    }

    /**
     * 层级
     */
    get depth(): number {
        return this.node.depth
    }

    /**
     * xml的length
     */
    get size(): number {
        return this.node.nodeSize;
    }

    /**
     * pos
     * 定义一个唯一位置
     */
    get pos(): number {
        const { parent } = this;

        if (!parent) {
            return -1;
        }

        const siblings = parent.children;
        const index = siblings.indexOf(this);
        const precedingSiblings = siblings.slice(0, index);
        return precedingSiblings.reduce(
            (pos, sibling) => pos + sibling.size,
            parent.pos
        );
    }

    /**
     * 当前真实的位置
     */
    get bounds(): IBoundsData {
        if (this.ui) {
            const { x, y, height, width } = this.ui.__localBoxBounds;
            return { x: this.ui.x || x, y: this.ui.y || y, height, width };
        }
        return { x: 0, y: 0, height: 0, width: 0 }
    }

    // 获取对应 pos 的位置
    pointFromPos(pos: number, preferBefore: boolean): {
        object: UI | null,
        offset: number
    } {
        let index = 0;
        let offset = 0;

        while (index < this.children.length) {
            const child = this.children[index];
            const isLastChild = index === this.children.length - 1;

            const { size } = child;
            const start = offset;
            const end = offset + size;
            const after = end;

            if (pos < after || (pos === after && preferBefore) || isLastChild) {
                return child.pointFromPos(pos - start, preferBefore);
            }

            index = index + 1;
            offset = offset + size;
        }

        return { object: this.ui, offset: pos };
    }

    // 更新
    update(): boolean {
        return false;
    }

    destroy() {
        this.children.forEach(item => item.destroy());
        if (this.ui) {
            Reflect.deleteProperty(this.ui, VIEW_KEY);
            this.context.render.remove(this.ui);
        }
    }

    nodeAt(node: Node): View | undefined {
        return View.NodeViewMap.get(node);
    }

    static NodeViewMap = new WeakMap<Node, View>;
}