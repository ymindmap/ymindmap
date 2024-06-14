import { NodeType } from '../node'

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
                name: 'root'
            })
        };

        const nodes = Object.keys(this.spec.nodes).reduce((list, key) => {
            list.push(this.spec.nodes[key]);
            return list;
        }, [this.topNodeType])
        nodes.forEach((node) => this.registerNode(node));
    }

    private registerNode(node: NodeType) {
        if (!this.spec.nodes[node.name]) this.spec.nodes[node.name] = node;
        node.setSchema(this);
    }

    get topNodeType(): NodeType {
        return this.spec.topNodeType;
    }

    get nodes(): { [key: string]: NodeType } {
        return this.spec.nodes;
    }
}