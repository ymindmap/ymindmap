import { Board, Options } from '@ymindmap/core'
import { NodeView, VIEW_KEY } from '@ymindmap/view'
import { KeyEvent } from 'leafer-ui';
import { keydownHandler } from './keymap';
import { Editor, registerTextEditor, EditorEvent } from './editor'
import '@leafer-in/state'

export * from '@ymindmap/core';

/**
 * 网页版的mindmap
 * 支持事件上的缩放，增加事件回调
 * 同时如果获取了canvas的dom，就需要初始化一个quill editor
 */
export class Mindmap extends Board {
    private editor: Editor | null = null;
    private container: HTMLDivElement | null = null;
    private keydownHandler: any;
    private syncSelection: (e: EditorEvent) => void = (e) => {
        if (this.state) this.state.selected = e.list
            .map(item => Reflect.get(item, VIEW_KEY) as NodeView | null)
            .filter(item => item)
            .map(nodeView => (nodeView as NodeView).node);
    };

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
        this.container = container;

        this.initEditor();
        this.setEditable(options.editable);

        /**
         * 绑定键盘事件
         */
        this.keydownHandler = keydownHandler(this.keymapBinding, this)
        this.container.addEventListener('keydown', this.keydownHandler, true);
        this.view?.context.render.on(KeyEvent.DOWN, this.keydownHandler);
    }

    init(data: any) {
        super.init(data);
        if (this.editor) this.editor.destroy();
        this.editor = null;
        this.initEditor();
    }

    initEditor() {
        if (this.editor) return;
        /**
         * @see https://www.leaferjs.com/ui/plugin/in/editor/
         * 这里采用手动注入editor，减少无用的能力
         * 一些resizeable之类的能力如果要做白板需要变成动态启用
         */
        this.editor = new Editor({

        });
        this.editor.hittable = false;
        this.editor.on(EditorEvent.SELECT, this.syncSelection);

        // editor绑定选区事件同步给state

        if (this.view) {
            this.view.app.sky.add(this.editor);
            // 注册自定义的dom编辑器
            registerTextEditor(this.editor, this.view.app.tree);
        } else {
            throw new Error('can not find view for editor init');
        }
    }

    get dom(): HTMLDivElement {
        return this.container as HTMLDivElement;
    }

    get isEditable() {
        return this.editor ? this.editor.hittable : false;
    }

    setEditable(value: boolean = false) {
        if (this.editor) this.editor.hittable = value
    }

    destroy() {
        // 销毁的方法
        super.destroy();
        if (this.editor) {
            this.editor.off(EditorEvent.SELECT, this.syncSelection);
            this.editor.destroy()
        };
        if (!this.container) return;
        this.container.removeEventListener('keydown', this.keydownHandler, true);
        this.view?.context.render.off(KeyEvent.DOWN, this.keydownHandler);
        if (this.container.parentElement) {
            this.container.parentElement.removeChild(this.container.parentElement);
            this.container = null;
        }
    }
}