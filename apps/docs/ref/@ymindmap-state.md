# :factory: Schema

## Methods

- [registerNode](#gear-registernode)
- [parseNode](#gear-parsenode)
- [createNode](#gear-createnode)

### :gear: registerNode

| Method | Type |
| ---------- | ---------- |
| `registerNode` | `(node: NodeType<NodeSpec<any>>) => void` |

### :gear: parseNode

parseNode from xmlElement

| Method | Type |
| ---------- | ---------- |
| `parseNode` | `(xml: YXmlElement<{ [key: string]: string; }> or YXmlText) => Node<any> or null` |

### :gear: createNode

createNode

| Method | Type |
| ---------- | ---------- |
| `createNode` | `(type: string or NodeType<NodeSpec<any>>, attrs: IAttrs, content: INodeContent) => Node<any>` |


# :factory: NodeType

## Methods

- [setSchema](#gear-setschema)
- [create](#gear-create)
- [parse](#gear-parse)
- [createNode](#gear-createnode)

### :gear: setSchema

| Method | Type |
| ---------- | ---------- |
| `setSchema` | `(schema: Schema) => void` |

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(attrs?: IAttrs, content?: INodeContent, initYFragment?: YXmlElement<{ [key: string]: string; }> or YXmlText or null) => Node<any>` |

### :gear: parse

| Method | Type |
| ---------- | ---------- |
| `parse` | `(xml: YXmlElement<{ [key: string]: string; }> or YXmlText) => Node<any>` |

### :gear: createNode

| Method | Type |
| ---------- | ---------- |
| `createNode` | `<T extends NodeSpec<any>>(options: { name: string; } and T) => NodeType<T>` |


# :factory: Node

一个基础的node
作为定义转为yjs的代理

# :factory: State

## Methods

- [create](#gear-create)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(data: Doc or Uint8Array or undefined, config: Omit<StateConfig, "doc" or "undoManager">) => State` |


# :tropical_drink: Interfaces

- [NodeSpec](#gear-nodespec)
- [ISchemaSpec](#gear-ischemaspec)
- [StateConfig](#gear-stateconfig)

## :gear: NodeSpec



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `content` | `string or undefined` |  |
| `group` | `string or undefined` |  |
| `attrs` | `{ [key in keyof K]: IAttrSpec; } or undefined` |  |
| `selectable` | `boolean or undefined` |  |
| `draggable` | `boolean or undefined` |  |
| `toCanvas` | `((node: Node<K>, context: NodeToCanvasContext) => UI) or undefined` |  |


## :gear: ISchemaSpec



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `nodes` | `{ [key: string]: NodeType<NodeSpec<any>>; }` |  |
| `topNodeType` | `NodeType<NodeSpec<any>>` |  |


## :gear: StateConfig



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `schema` | `Schema` |  |
| `doc` | `Doc` |  |
| `undoManager` | `UndoManager` |  |
| `plugins` | `unknown[] or undefined` |  |
| `selected` | `Node<any>[] or undefined` |  |
| `pluginState` | `Record<string, any> or undefined` |  |


# :cocktail: Types

- [NodeToCanvasContext](#gear-nodetocanvascontext)
- [INodeContent](#gear-inodecontent)

## :gear: NodeToCanvasContext

| Type | Type |
| ---------- | ---------- |
| `NodeToCanvasContext` | `{
    theme: Theme;
    render: Leafer;
}` |

## :gear: INodeContent

| Type | Type |
| ---------- | ---------- |
| `INodeContent` | `Array<XmlElement or XmlText or Node> or XmlElement or XmlText or string or null` |

