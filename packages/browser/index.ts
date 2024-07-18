import { Board, Options } from '@ymindmap/core'
import '@leafer-in/state'

export * from '@ymindmap/core';

/**
 * 网页版的mindmap
 * 支持事件上的缩放，增加事件回调
 * 同时如果获取了canvas的dom，就需要初始化一个quill editor
 */
export class Mindmap extends Board<{
    "keydown": KeyboardEvent
}> {
    // private editor: Editor | null = null;
    private editable: boolean = false;
    private container: HTMLDivElement | null = null;

    constructor(options: Options & { editable?: boolean }) {
        const container = document.createElement('div');
        super({ ...options, container });
        this.setEditable(options.editable);
        this.container = container;
    }

    // initEditor() {
    //     if (this.editor) return;
    //     const editor = new Editor(this.canvas);
    //     this.editor = editor;
    //     // 绑定canvas的object的双击事件
    //     this.canvas.on('mouse:dblclick', (e) => {
    //         const target = e.target;
    //         if (target) {
    //             if (this.isEditable) {
    //                 editor.bind(target);
    //             }
    //         }
    //     })
    // }

    get dom(): HTMLDivElement {
        return this.container as HTMLDivElement;
    }

    get isEditable() {
        return this.editable;
    }

    setEditable(value: boolean = false) {
        this.editable = value;
    }

    destroy() {
        super.destroy();
        if (!this.container) return;
        if (this.container.parentElement) {
            this.container.parentElement.removeChild(this.container.parentElement);
            this.container = null;
        }
    }
}