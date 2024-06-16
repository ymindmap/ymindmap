/**
 * 绑定
 */
import { XmlElement, YXmlEvent } from 'yjs'
import { ObjectView, ObjectViewConstructorOptions } from './view';

export type ElementObjectViewOptions = ObjectViewConstructorOptions & {
    observe?: (e: YXmlEvent) => void
}

export class ElementObjectView extends ObjectView<XmlElement, fabric.Rect> {
    constructor(options: ElementObjectViewOptions) {
        super(options);

        // 绑定数据
        const { observe } = options;
        if (this.data && this.view) {
            const { data } = this;
            // 更新
            data.observe((e) => {
                console.log(e, '');
                observe && observe(e);
            })
        }
    }

    static create(options: ElementObjectViewOptions) {
        return new ElementObjectView(options);
    }
}