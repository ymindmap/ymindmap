import { Mindmap as CoreMindmap, Options } from '@ymindmap/core'
import { getElement, destroy as domDestroy } from './dom/index'
import { Editor } from './editor'

export * from '@ymindmap/core';

export class Mindmap extends CoreMindmap<{
    "keydown": KeyboardEvent
}> {
    private editor: Editor;
    private editable: boolean = false;

    constructor(options: Options & { editable?: boolean }) {
        super(options);
        this.editor = new Editor(this.canvas);
        this.setEditable(options.editable);

        // 绑定canvas的object的双击事件
        this.canvas.on('mouse:dblclick', (e) => {
            const target = e.target;
            if (target) {
                if (this.isEditable) {
                    this.editor.bind(target);
                }
            }
        })
    }

    get dom(): HTMLDivElement {
        return getElement(this.canvas);
    }

    get isEditable() {
        return this.editable;
    }

    setEditable(value: boolean = false) {
        this.editable = value;
    }

    destroy() {
        domDestroy(this.canvas);
        // this.editor.destroy();
        super.destroy();
    }
}