/**
 * view
 */
import type { fabric } from 'fabric'
import { Node, NodeToFabricContext } from '@ymindmap/model'

export const VIEW_KEY = '__Y_MINDMAP_VIEW__'

export class View<T extends fabric.Object = fabric.Object> {
    context: NodeToFabricContext;
    node: Node;
    fabricObject: T | null;
    parent: null | View;
    children: View[];

    constructor(
        context: NodeToFabricContext,
        node: Node,
        fabricObject?: T | null,
        parent?: View | null
    ) {
        this.context = context;
        this.node = node;
        this.fabricObject = fabricObject || null;
        this.parent = parent || null;
        this.children = []

        if (this.fabricObject) {
            Reflect.set(this.fabricObject, VIEW_KEY, this);
            this.context.canvas.add(this.fabricObject);
        }

        // 订阅更新移除自己的子节点
        this.node.state.observe((e) => {
            // 监听到更新啦
            console.log(e);
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

    // 获取对应 pos 的位置
    pointFromPos(pos: number, preferBefore: boolean): {
        object: fabric.Object | null,
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

        return { object: this.fabricObject, offset: pos };
    }

    // 更新
    update(): boolean {
        return false;
    }

    destroy() {
        this.children.forEach(item => item.destroy());
        if (this.fabricObject) {
            Reflect.deleteProperty(this.fabricObject, VIEW_KEY);
            this.context.canvas.remove(this.fabricObject);
        }
    }

    nodeAt(node: Node): View | undefined {
        return View.NodeViewMap.get(node);
    }

    static NodeViewMap = new WeakMap<Node, View>;
}