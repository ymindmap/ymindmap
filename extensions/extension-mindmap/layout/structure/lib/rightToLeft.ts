import { NodeView } from "@ymindmap/view";

function getCenterX(nodeView: NodeView) {
    const { bounds } = nodeView
    return bounds.x + bounds.width / 2
}

/**
 * 右侧的树基于某个节点自动旋转
 */
export function right2left(reference: NodeView, child?: NodeView[]) {
    if (!reference.ui) return;
    const childNodes: NodeView[] = child || reference.children.filter(item => item instanceof NodeView) as NodeView[];
    if (!childNodes.length) return;
    const referenceCenterX = getCenterX(reference)
    childNodes.forEach(child => {
        if (child instanceof NodeView) right2left(reference, child.children as NodeView[]);
        if (child.ui) {
            const offset = getCenterX(child) - referenceCenterX;
            if (offset > 0) {
                child.ui.x = child.bounds.x
                    - offset * 2
                    - child.bounds.width / 2
            }
        }
    })
}