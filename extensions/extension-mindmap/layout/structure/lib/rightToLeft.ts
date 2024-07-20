import { NodeView, View } from "@ymindmap/view";
import type { UI } from 'leafer-ui'

function getCenterX(ui: UI) {
    return ui.x || 0 + (ui.width || 0) / 2
}

/**
 * 右侧的树基于某个节点自动旋转
 */
export function right2left(reference: NodeView, child?: View[]) {
    if (!reference.ui) return;
    const childNodes = child || reference.children;
    const referenceCenterX = getCenterX(reference.ui)
    childNodes.forEach(child => {
        if (child instanceof NodeView) right2left(child);
        if (child.ui) {
            const offset = getCenterX(child.ui) - referenceCenterX;
            if (offset > 0) {
                child.ui.x =
                    (child.ui.x || 0)
                    - offset * 2
                    - (child.ui.width || 0) / 2
            }
        }
        if (child instanceof NodeView) right2left(child);
    })
}