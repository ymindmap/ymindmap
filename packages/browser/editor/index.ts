/**
 * @see https://www.leaferjs.com/ui/plugin/in/editor/editOuter/load.html
 * 强制修改编辑器工具
 */
import { PointerEvent, Text } from 'leafer-ui';
// import { VIEW_KEY } from '@ymindmap/view';
import type { ILeafer, IPointerEvent } from '@leafer-ui/interface';
import type { Editor } from '@leafer-in/editor';
import { TextEditor } from './text';

export { Editor, InnerEditor, EditorEvent } from '@leafer-in/editor';
export { TextEditor } from './text';

/**
 * 普通的文本编辑器
 * @todo 在这个基础上支持自定义的文本编辑器
 * @param leafer 
 */
export function registerTextEditor(editor: Editor, leafer: ILeafer) {
    // 注册双击编辑事件
    const { parentView } = leafer.canvas;

    leafer.on(PointerEvent.DOUBLE_TAP, (e: IPointerEvent) => {
        if (e.target) {
            const { target } = e;
            /**
             * 暂时只支持text
             * @todo 支持复合文本（title类型）
             */
            if (target instanceof Text) {
                new TextEditor(target, parentView);
                editor.cancel();
            }
        }
    })
}