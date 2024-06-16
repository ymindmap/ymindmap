/**
 * 基于quill的编辑器
 * @see https://github.com/yjs/y-quill
 */
import { fabric } from 'fabric'
import Quill from 'quill'
import { XmlText, XmlElement } from 'yjs'
import { QuillBinding } from 'y-quill';
import { getElement } from './dom';
import 'quill/dist/quill.snow.css'
import type { ObjectView } from '@ymindmap/view'

export class Editor {
    private el: HTMLDivElement;
    private editor: Quill;
    private binding: QuillBinding | null = null;
    private canvas: fabric.Canvas;
    private onBlur: null | ((e: Event) => void);
    constructor(canvas: fabric.Canvas) {
        // 一个临时挂载的编辑器节点
        this.el = document.createElement('div');
        const container = getElement(canvas);
        container.appendChild(this.el);
        this.canvas = canvas;
        this.editor = new Quill(this.el);

        this.el.style.position = 'absolute';
        this.el.style.display = 'none';

        this.el.style.background = 'rgba(0,0,0,0.1)';

        this.onBlur = this.unmount.bind(this);
        this.editor.root.addEventListener("blur", this.onBlur);
    }

    get editorEl(): HTMLDivElement {
        return this.el
    }

    get instance(): Quill {
        return this.editor;
    }

    mount(objectView: ObjectView): void {
        if (!objectView.data || !objectView.view) return this.unmount();
        let text: XmlText;
        if (objectView.data.firstChild instanceof XmlElement) {
            text = new XmlText();
            objectView.data.insert(0, [text]);
        } else {
            text = objectView.data.firstChild as XmlText;
        }

        this.binding = new QuillBinding(text, this.editor);

        const { left, top, height } = objectView.view.getBoundingRect();
        this.el.style.left = left + 'px';
        this.el.style.top = top + 'px';
        this.el.style.height = height + 'px';
        this.el.style.transform = `scale(${this.canvas.getZoom()})`;

        this.el.style.display = '';

        this.editor.focus();
    }

    unmount() {
        if (this.binding) this.binding.destroy();
        this.binding = null;
        this.el.style.display = 'none';
    }

    destroy() {
        this.unmount();
        if (this.onBlur) this.editor.root.removeEventListener("blur", this.onBlur);
        this.el.parentElement?.removeChild(this.el);
    }
}