# :toolbox: Functions

- [string2Yjs](#gear-string2yjs)
- [yjs2string](#gear-yjs2string)
- [getDefaultData](#gear-getdefaultdata)

## :gear: string2Yjs

| Function | Type |
| ---------- | ---------- |
| `string2Yjs` | `(xmlString: string) => Uint8Array` |

## :gear: yjs2string

| Function | Type |
| ---------- | ---------- |
| `yjs2string` | `(doc: Doc) => string` |

## :gear: getDefaultData

| Function | Type |
| ---------- | ---------- |
| `getDefaultData` | `() => string` |


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

# :factory: State

## Methods

- [create](#gear-create)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(data: Doc or Uint8Array or undefined, config: Omit<StateConfig, "doc" or "undoManager">) => State` |


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


# :factory: CommandManager

## Methods

- [registerCommands](#gear-registercommands)

### :gear: registerCommands

| Method | Type |
| ---------- | ---------- |
| `registerCommands` | `(rawCommands: RawCommands) => void` |


# :factory: Extension

## Methods

- [create](#gear-create)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(options: IExtensionOptions, boardOptions: Record<string, any>) => Extension<Record<string, any>, Record<string, any>>` |


# :factory: ExtensionManager

## Methods

- [invokeUpdate](#gear-invokeupdate)
- [invokeCreate](#gear-invokecreate)
- [invokeDestroy](#gear-invokedestroy)
- [registerExtension](#gear-registerextension)

### :gear: invokeUpdate

| Method | Type |
| ---------- | ---------- |
| `invokeUpdate` | `() => void` |

### :gear: invokeCreate

| Method | Type |
| ---------- | ---------- |
| `invokeCreate` | `() => void` |

### :gear: invokeDestroy

| Method | Type |
| ---------- | ---------- |
| `invokeDestroy` | `() => void` |

### :gear: registerExtension

| Method | Type |
| ---------- | ---------- |
| `registerExtension` | `(extensions: Record<string, IExtensionConfig<any, any>>, defaultOptions: Record<string, any>) => void` |


# :factory: Board

## Methods

- [init](#gear-init)
- [undo](#gear-undo)
- [redo](#gear-redo)
- [toDataUrl](#gear-todataurl)
- [toSvg](#gear-tosvg)
- [getData](#gear-getdata)
- [toString](#gear-tostring)
- [destroy](#gear-destroy)

### :gear: init

| Method | Type |
| ---------- | ---------- |
| `init` | `(data?: string or Doc or Uint8Array or undefined) => void` |

### :gear: undo

| Method | Type |
| ---------- | ---------- |
| `undo` | `() => void` |

### :gear: redo

| Method | Type |
| ---------- | ---------- |
| `redo` | `() => void` |

### :gear: toDataUrl

| Method | Type |
| ---------- | ---------- |
| `toDataUrl` | `(type?: "jpg" or "png" or "webp", quality?: number or undefined) => string or Promise<string>` |

### :gear: toSvg

转为svg的方法

| Method | Type |
| ---------- | ---------- |
| `toSvg` | `() => string or Promise<any> or null` |

### :gear: getData

| Method | Type |
| ---------- | ---------- |
| `getData` | `() => string` |

### :gear: toString

| Method | Type |
| ---------- | ---------- |
| `toString` | `() => string` |

### :gear: destroy

销毁的办法

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |


# :tropical_drink: Interfaces

- [NodeSpec](#gear-nodespec)
- [ISchemaSpec](#gear-ischemaspec)
- [StateConfig](#gear-stateconfig)
- [IExtensionConfig](#gear-iextensionconfig)

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


## :gear: IExtensionConfig



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `addCommands` | `((extension: Extension<IOptions, IStorage>) => RawCommands) or undefined` |  |
| `addNodes` | `(() => Record<string, NodeType<NodeSpec<any>>>) or undefined` |  |
| `addOptions` | `(() => Record<string, any>) or undefined` |  |
| `addStorage` | `(() => Record<string, any>) or undefined` |  |
| `onBeforeCreate` | `((this: Extension<IOptions, IStorage>, board: Board<any>) => void) or undefined` |  |
| `onCreate` | `((this: Extension<IOptions, IStorage>, board: Board<any>) => void) or undefined` |  |
| `onDestroy` | `((this: Extension<IOptions, IStorage>, board: Board<any>) => void) or undefined` |  |
| `onUpdate` | `((this: Extension<IOptions, IStorage>, board: Board<any>) => void) or undefined` |  |


# :cocktail: Types

- [NodeToCanvasContext](#gear-nodetocanvascontext)
- [INodeContent](#gear-inodecontent)
- [ViewOptions](#gear-viewoptions)
- [IExtensionOptions](#gear-iextensionoptions)
- [Options](#gear-options)

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

## :gear: IExtensionOptions

| Type | Type |
| ---------- | ---------- |
| `IExtensionOptions` | `IExtensionConfig and {
    name: string,
    board: Board
}` |

## :gear: Options

| Type | Type |
| ---------- | ---------- |
| `Options` | `{
    data?: string or Uint8Array;
    width?: number;
    height?: number;
    theme?: string;
    themeList?: { [key: string]: Theme };
    options?: Record<string, any>;
    extensions?: Record<string, IExtensionConfig>
    container?: any
} and {
    schema?: Schema;
    debug?: boolean;
}` |

