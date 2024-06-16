/**
 * 绑定
 */
import { XmlText } from 'yjs'
import { ObjectView, ObjectViewConstructorOptions } from './view';

export class TextObjectView extends ObjectView<XmlText, fabric.IText> {
    constructor(options: ObjectViewConstructorOptions) {
        super(options);

        // 绑定数据
        if (this.data && this.view) {
            const { view, data } = this;
            // 更新
            data.observe(() => {
                view.set('text', data.toString() as string)
                // 设置宽度
                const width = Math.max(...view.__lineWidths);
                view.set('width', width)
                this.updateStyle({ width });

                this.canvas?.renderAll();
                // 更新布局
                this.updateView(true);
            })
        }
    }

    static create(options: ObjectViewConstructorOptions) {
        return new TextObjectView(options);
    }
}