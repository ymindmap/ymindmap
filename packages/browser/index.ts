import { Mindmap as CoreMindmap, Options } from '@ymindmap/core'
import { getElement, destroy as domDestroy } from './dom/index'

export * from '@ymindmap/core';

/**
 * 网页版的mindmap
 * 支持事件上的缩放，增加事件回调
 * 同时如果获取了canvas的dom，就需要初始化一个quill editor
 */
export class Mindmap extends CoreMindmap<{
    "keydown": KeyboardEvent
}> {
    // private editor: Editor | null = null;
    private editable: boolean = false;

    constructor(options: Options & { editable?: boolean }) {
        super(options);
        this.setEditable(options.editable);

        // 绑定editable 自动同步注入
        this.canvas.on('object:added', (e) => e.target && e.target.set('editable' as any, this.editable));
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
        const element = getElement(this.canvas, this);

        // 有人获取了element说明可以进行编辑器的初始化了
        // this.initEditor();

        return element;
    }

    get isEditable() {
        return this.editable;
    }

    setEditable(value: boolean = false) {
        this.editable = value;

        // 所有子节点都设置这个属性
        const getAllObjects = function (
            container: fabric.Group | fabric.Canvas,
            list: fabric.Object[] = []
        ) {
            const objects = container.getObjects();
            list.push(...objects);
            objects.forEach(object => {
                if (Reflect.has(object, 'getObjects')) getAllObjects(object as fabric.Group, list);
            })
            return list;
        }
        const allObjects = getAllObjects(this.canvas);
        /**
         * @todo 如果有编辑的需要强制退出编辑
         */
        allObjects.forEach(object => object.set('editable' as any, value));
    }

    destroy() {
        domDestroy(this.canvas);
        // this.editor.destroy();
        super.destroy();
    }
}