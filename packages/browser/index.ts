import { Mindmap as CoreMindmap, Options } from '@ymindmap/core'
import { FABRIC_OBJECT_VIEW_KEY } from '@ymindmap/view'
import { getElement, destroy as domDestroy } from './dom/index'
import { Editor } from './editor'

export * from '@ymindmap/core';

export class Mindmap extends CoreMindmap {
    private editor: Editor;
    private editable: boolean = false;

    constructor(options: Options & { editable?: boolean }) {
        super(options);
        this.editor = new Editor(this.canvas);
        this.editable = options.editable ?? false;

        // 绑定canvas的object的双击事件
        this.canvas.on('mouse:dblclick', (e) => {
            const target = e.target;
            if (target) {
                /**
                 * @todo view层判断这个对象的node节点以及是否可以编辑
                 */
                if (this.isEditable && Reflect.has(target, FABRIC_OBJECT_VIEW_KEY)) {
                    this.editor.mount(Reflect.get(target, FABRIC_OBJECT_VIEW_KEY));
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
        this.editor.destroy();
        super.destroy();
    }
}