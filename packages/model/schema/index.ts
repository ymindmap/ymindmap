import { XmlElement, XmlText } from 'yjs'
import {
    NodeType,
    Node,
    IAttrs,
    INodeContent
} from '../node'

export interface ISchemaSpec {
    nodes: {
        [key: string]: NodeType;
    }
    topNodeType: NodeType;
}

export class Schema {
    spec: ISchemaSpec;

    constructor(spec: Pick<ISchemaSpec, 'nodes'> & Partial<Pick<ISchemaSpec, 'topNodeType'>>) {
        this.spec = {
            ...spec,
            topNodeType: spec.topNodeType || NodeType.createNode({
                name: 'doc',
                attrs: {
                    background: {
                    }
                }
            })
        };

        this.allNodes.forEach((node) => this.registerNode(node));
    }

    public registerNode(node: NodeType) {
        if (!this.spec.nodes[node.name]) this.spec.nodes[node.name] = node;
        node.setSchema(this);
    }

    get topNodeType(): NodeType {
        return this.spec.topNodeType;
    }

    get nodes(): { [key: string]: NodeType } {
        return this.spec.nodes;
    }

    private get allNodes() {
        return Object.keys(this.spec.nodes).reduce<NodeType[]>((list, key) => {
            list.push(this.spec.nodes[key]);
            return list;
        }, [this.topNodeType])
    }

    /** parseNode from xmlElement */
    parseNode(xml: XmlElement | XmlText): Node | null {
        const nodeName = xml instanceof XmlElement ? xml.nodeName : 'text';
        const nodeType = this.nodes[nodeName];
        if (nodeType) return nodeType.parse(xml);
        return null;
    }

    /** createNode */
    createNode(type: string | NodeType, attrs: IAttrs, content: INodeContent) {
        const nodeType = typeof type === 'string' ? this.spec.nodes[type] : type;
        return nodeType.create(attrs, content)
    }
}