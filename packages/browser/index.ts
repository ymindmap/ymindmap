import { Board, Options } from '@ymindmap/core'
import { Editor } from '@leafer-in/editor' // 导入图形编辑器插件
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

    constructor(options: Options & { editable?: boolean, el: HTMLElement | string }) {
        const container = document.createElement('div');
        /**
         * container 的尺寸在这里设定默认100%
         */
        container.style.width = options.width ? Math.abs(options.width) + 'px' : '100%';
        container.style.height = options.height ? Math.abs(options.height) + 'px' : '100%';
        const parentElement = options.el instanceof HTMLElement ? options.el : document.querySelector(options.el);
        if (!parentElement) throw new Error('options.el is not a HTMLElement or valid querySelector');
        parentElement.appendChild(container);

        super({ ...options, container: container });
        this.setEditable(options.editable);
        this.container = container;

        this.initEditor();
    }

    initEditor() {
        /**
         * @see https://www.leaferjs.com/ui/plugin/in/editor/
         * 这里采用手动注入editor，减少无用的能力
         */
    }

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