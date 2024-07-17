/**
 * 将对应的主题移动到中间
 */
import type { Command } from '@ymindmap/core';

/**
 * 移动到中心
 * @param state 
 * @param view 
 * @returns 
 */
export const moveRootMindmapToCenter: () => Command = () => (_state, view) => {
    if (!view.ui) throw new Error('leafer is not inited');
    const rootMindmap = view.ui.findOne('.mindmap');
    if (!rootMindmap) return false;

    view.ui.zoom(rootMindmap.getBounds(), 0, true);

    return true
}