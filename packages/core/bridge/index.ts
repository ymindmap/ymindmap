/**
 * 处理数据和yjs的转换逻辑
 */
import xmljs from 'xml-js';
import {
    Doc,
    XmlElement,
    XmlFragment,
    XmlText,
    encodeStateAsUpdateV2
} from 'yjs';

/**
 * @see https://discuss.yjs.dev/t/how-to-convert-xml-string-to-y-xmlfragment/666/2
 * @param xmlString 
 */
export function string2Yjs(xmlString: string) {
    const doc = new Doc();
    // 需要使用compact为false来保证顺序
    const result = xmljs.xml2js(xmlString, { compact: false }) as xmljs.Element;
    const root = doc.getXmlFragment('default');

    function parse(element: xmljs.Element, parent: XmlElement | XmlFragment) {
        const { name, attributes, elements, type } = element;
        if (type === 'text') {
            parent.insert(parent.length, [new XmlText(element.text as '')])
        } else {
            const YElement = new XmlElement(name);
            if (typeof attributes === 'object') {
                Object.keys(attributes).forEach(key => {
                    YElement.setAttribute(key, attributes[key] as string);
                })
            }
            parent.insert(parent.length, [YElement]);
            if (elements) {
                elements.forEach((element: xmljs.Element) => {
                    parse(element, YElement);
                })
            }
        }
    }

    parse((result.elements as xmljs.Element[])[0], root);

    return encodeStateAsUpdateV2(doc)
}

export function yjs2string(doc: Doc) {
    return doc.getXmlFragment('default').toString();
}