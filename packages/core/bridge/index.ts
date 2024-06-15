/**
 * 处理数据和yjs的转换逻辑
 */
import xmljs from 'xml-js';
import { Doc, XmlElement, XmlFragment, XmlText, encodeStateVector } from 'yjs';

/**
 * @see https://discuss.yjs.dev/t/how-to-convert-xml-string-to-y-xmlfragment/666/2
 * @param xmlString 
 */
export function string2Yjs(xmlString: string) {
    const doc = new Doc();
    const result = xmljs.xml2js(xmlString);
    const root = doc.getXmlFragment('default');

    function parse(element: xmljs.Element | xmljs.ElementCompact, parent: XmlElement | XmlFragment) {
        const { name, attributes, elements, type } = element;
        if (type === 'text') {
            parent.insert(parent.length, [new XmlText(element.text)])
        } else {
            const YElement = new XmlElement(name);
            if (typeof attributes === 'object') {
                Object.keys(attributes).forEach(key => {
                    YElement.setAttribute(key, attributes[key]);
                })
            }
            parent.insert(parent.length, [YElement]);
            if (elements) {
                elements.forEach((element: (xmljs.Element | xmljs.ElementCompact)[]) => {
                    parse(element, YElement);
                })
            }
        }
    }

    parse(result, root);

    return encodeStateVector(doc)
}

export function yjs2string(doc: Doc) {
    return doc.getXmlFragment('default').toString();
}