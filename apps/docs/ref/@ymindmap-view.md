# :wrench: Constants

- [VIEW_KEY](#gear-view_key)
- [theme](#gear-theme)

## :gear: VIEW_KEY

| Constant | Type |
| ---------- | ---------- |
| `VIEW_KEY` | `"__Y_MINDMAP_VIEW__"` |

## :gear: theme

| Constant | Type |
| ---------- | ---------- |
| `theme` | `Theme` |


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

# :factory: View

## Methods

- [pointFromPos](#gear-pointfrompos)
- [update](#gear-update)
- [destroy](#gear-destroy)
- [nodeAt](#gear-nodeat)

### :gear: pointFromPos

| Method | Type |
| ---------- | ---------- |
| `pointFromPos` | `(pos: number, preferBefore: boolean) => { object: UI or null; offset: number; }` |

### :gear: update

| Method | Type |
| ---------- | ---------- |
| `update` | `() => boolean` |

### :gear: destroy

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

### :gear: nodeAt

| Method | Type |
| ---------- | ---------- |
| `nodeAt` | `(node: Node<any>) => View<UI> or undefined` |


# :factory: TextView

## Methods

- [pointFromPos](#gear-pointfrompos)
- [update](#gear-update)

### :gear: pointFromPos

| Method | Type |
| ---------- | ---------- |
| `pointFromPos` | `(pos: number) => { object: Text or null; offset: number; }` |

### :gear: update

| Method | Type |
| ---------- | ---------- |
| `update` | `() => boolean` |


# :factory: NodeView

## Methods

- [update](#gear-update)
- [createChildView](#gear-createchildview)
- [getMatrix](#gear-getmatrix)

### :gear: update

| Method | Type |
| ---------- | ---------- |
| `update` | `() => boolean` |

### :gear: createChildView

| Method | Type |
| ---------- | ---------- |
| `createChildView` | `(yFragment: YXmlElement<{ [key: string]: string; }> or YXmlText) => void` |

### :gear: getMatrix

| Method | Type |
| ---------- | ---------- |
| `getMatrix` | `(inner?: boolean or undefined) => Matrix` |


# :factory: State

## Methods

- [create](#gear-create)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(data: Doc or Uint8Array or undefined, config: Omit<StateConfig, "doc" or "undoManager">) => State` |


# :factory: BoardView

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

### :gear: toDataUrl

| Method | Type |
| ---------- | ---------- |
| `toDataUrl` | `(type?: "jpg" or "png" or "webp", quality?: number or undefined) => string or Promise<string>` |

### :gear: toSvg

转为svg的方法

| Method | Type |
| ---------- | ---------- |
| `toSvg` | `() => string or Promise<any>` |

### :gear: destroy

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(state: State, theme: Theme, options?: ViewOptions or undefined) => BoardView` |


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

## :gear: INodeContent

| Type | Type |
| ---------- | ---------- |
| `INodeContent` | `Array<XmlElement or XmlText or Node> or XmlElement or XmlText or string or null` |

## :gear: ViewOptions

| Type | Type |
| ---------- | ---------- |
| `ViewOptions` | `{
    width?: number,
    height?: number,
    debug?: boolean,
    container?: any
}` |

