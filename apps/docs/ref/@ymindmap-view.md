# :wrench: Constants

- [VIEW_KEY](#gear-view_key)
- [theme](#gear-theme)

## :gear: VIEW_KEY

| Constant | Type |
| ---------- | ---------- |
| `VIEW_KEY` | `"__Y_MINDMAP_VIEW__"` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/view.ts#L9)

## :gear: theme

| Constant | Type |
| ---------- | ---------- |
| `theme` | `Theme` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/theme/index.ts#L2)


# :factory: Schema

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/schema/index.ts#L16)

## Methods

- [registerNode](#gear-registernode)
- [parseNode](#gear-parsenode)
- [createNode](#gear-createnode)

### :gear: registerNode

| Method | Type |
| ---------- | ---------- |
| `registerNode` | `(node: NodeType<NodeSpec<any>>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/schema/index.ts#L34)

### :gear: parseNode

parseNode from xmlElement

| Method | Type |
| ---------- | ---------- |
| `parseNode` | `(xml: YXmlElement<{ [key: string]: string; }> or YXmlText) => Node<any> or null` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/schema/index.ts#L55)

### :gear: createNode

createNode

| Method | Type |
| ---------- | ---------- |
| `createNode` | `(type: string or NodeType<NodeSpec<any>>, attrs: IAttrs, content: INodeContent) => Node<any>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/schema/index.ts#L63)


# :factory: NodeType

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/type.ts#L7)

## Methods

- [setSchema](#gear-setschema)
- [create](#gear-create)
- [parse](#gear-parse)
- [createNode](#gear-createnode)

### :gear: setSchema

| Method | Type |
| ---------- | ---------- |
| `setSchema` | `(schema: Schema) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/type.ts#L17)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(attrs?: IAttrs, content?: INodeContent, initYFragment?: YXmlElement<{ [key: string]: string; }> or YXmlText or null) => Node<any>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/type.ts#L21)

### :gear: parse

| Method | Type |
| ---------- | ---------- |
| `parse` | `(xml: YXmlElement<{ [key: string]: string; }> or YXmlText) => Node<any>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/type.ts#L45)

### :gear: createNode

| Method | Type |
| ---------- | ---------- |
| `createNode` | `<T extends NodeSpec<any>>(options: { name: string; } and T) => NodeType<T>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/type.ts#L49)


# :factory: Node

一个基础的node
作为定义转为yjs的代理

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/node.ts#L23)

## Methods

- [appendChild](#gear-appendchild)
- [removeChild](#gear-removechild)

### :gear: appendChild

| Method | Type |
| ---------- | ---------- |
| `appendChild` | `(node: Node<any>, reference?: Node<any> or undefined) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/node.ts#L74)

### :gear: removeChild

| Method | Type |
| ---------- | ---------- |
| `removeChild` | `(node: Node<any>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/node.ts#L81)


# :factory: View

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/view.ts#L11)

## Methods

- [pointFromPos](#gear-pointfrompos)
- [destroy](#gear-destroy)
- [nodeAt](#gear-nodeat)

### :gear: pointFromPos

| Method | Type |
| ---------- | ---------- |
| `pointFromPos` | `(pos: number, preferBefore: boolean) => { object: UI or null; offset: number; }` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/view.ts#L102)

### :gear: destroy

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/view.ts#L129)

### :gear: nodeAt

| Method | Type |
| ---------- | ---------- |
| `nodeAt` | `(node: Node<any>) => View<UI> or undefined` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/view.ts#L137)


# :factory: TextView

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/textView.ts#L4)

## Methods

- [pointFromPos](#gear-pointfrompos)

### :gear: pointFromPos

| Method | Type |
| ---------- | ---------- |
| `pointFromPos` | `(pos: number) => { object: Text or null; offset: number; }` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/textView.ts#L5)


# :factory: NodeView

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/nodeView.ts#L13)

## Methods

- [createChildView](#gear-createchildview)
- [removeChildView](#gear-removechildview)
- [getMatrix](#gear-getmatrix)

### :gear: createChildView

| Method | Type |
| ---------- | ---------- |
| `createChildView` | `(yFragment: YXmlElement<{ [key: string]: string; }> or YXmlText, index?: number) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/nodeView.ts#L47)

### :gear: removeChildView

移除子节点

| Method | Type |
| ---------- | ---------- |
| `removeChildView` | `(index: number, size: number) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/nodeView.ts#L72)

### :gear: getMatrix

| Method | Type |
| ---------- | ---------- |
| `getMatrix` | `(inner?: boolean or undefined) => Matrix` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/view/nodeView.ts#L77)


# :factory: State

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/state/index.ts#L25)

## Methods

- [create](#gear-create)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(data: Doc or Uint8Array or undefined, config: Omit<StateConfig, "doc" or "undoManager">) => State` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/state/index.ts#L77)


# :factory: BoardView

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/index.ts#L17)

## Methods

- [setTheme](#gear-settheme)
- [toDataUrl](#gear-todataurl)
- [toSvg](#gear-tosvg)
- [destroy](#gear-destroy)
- [create](#gear-create)

### :gear: setTheme

| Method | Type |
| ---------- | ---------- |
| `setTheme` | `(theme: Theme) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/index.ts#L68)

### :gear: toDataUrl

| Method | Type |
| ---------- | ---------- |
| `toDataUrl` | `(type?: "jpg" or "png" or "webp", quality?: number or undefined) => string or Promise<string>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/index.ts#L76)

### :gear: toSvg

转为svg的方法

| Method | Type |
| ---------- | ---------- |
| `toSvg` | `() => string or Promise<any>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/index.ts#L83)

### :gear: destroy

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/index.ts#L87)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(state: State, theme: Theme, options?: ViewOptions or undefined) => BoardView` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/index.ts#L92)


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
- [ViewOptions](#gear-viewoptions)

## :gear: NodeToCanvasContext

| Type | Type |
| ---------- | ---------- |
| `NodeToCanvasContext` | `{
    theme: Theme;
    render: Leafer;
}` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/spec.ts#L6)

## :gear: INodeContent

| Type | Type |
| ---------- | ---------- |
| `INodeContent` | `Array<XmlElement or XmlText or Node> or XmlElement or XmlText or string or null` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/model/node/node.ts#L5)

## :gear: ViewOptions

| Type | Type |
| ---------- | ---------- |
| `ViewOptions` | `{
    width?: number,
    height?: number,
    debug?: boolean,
    container?: any
}` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/view/index.ts#L10)

