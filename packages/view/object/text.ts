/**
 * 绑定
 */
import { XmlText } from 'yjs'
import { ObjectView, ObjectViewConstructorOptions } from './view';

export class TextObjectView extends ObjectView<XmlText, fabric.Text> {
    constructor(options: ObjectViewConstructorOptions) {
        super(options);

        // 绑定数据
        if (this.data && this.view) {
            const { view, data } = this;
            // 更新
            data.observe(() => {
                view.set({
                    text: data.toString() as string
                })
            })
        }
    }

    static create(options: ObjectViewConstructorOptions) {
        return new TextObjectView(options);
    }
}