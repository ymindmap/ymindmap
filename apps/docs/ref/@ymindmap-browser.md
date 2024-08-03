# :toolbox: Functions

- [string2Yjs](#gear-string2yjs)
- [yjs2string](#gear-yjs2string)
- [getDefaultData](#gear-getdefaultdata)
- [isMac](#gear-ismac)
- [isWin](#gear-iswin)
- [getPadding](#gear-getpadding)
- [keydownHandler](#gear-keydownhandler)
- [registerTextEditor](#gear-registertexteditor)

## :gear: string2Yjs

| Function | Type |
| ---------- | ---------- |
| `string2Yjs` | `(xmlString: string) => Uint8Array` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/bridge/index.ts#L17)

## :gear: yjs2string

| Function | Type |
| ---------- | ---------- |
| `yjs2string` | `(doc: Doc) => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/bridge/index.ts#L48)

## :gear: getDefaultData

| Function | Type |
| ---------- | ---------- |
| `getDefaultData` | `() => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/config/defaultData.ts#L3)

## :gear: isMac

判断是否是mac环境

| Function | Type |
| ---------- | ---------- |
| `isMac` | `() => boolean` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/utils/navigator.ts#L5)

## :gear: isWin

| Function | Type |
| ---------- | ---------- |
| `isWin` | `() => boolean` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/utils/navigator.ts#L8)

## :gear: getPadding

| Function | Type |
| ---------- | ---------- |
| `getPadding` | `(value: IFourNumber) => [number, number, number, number]` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/utils/padding.ts#L2)

## :gear: keydownHandler

| Function | Type |
| ---------- | ---------- |
| `keydownHandler` | `(bindings: { [key: string]: Command; }, board: Board<any>) => (event: IKeyEvent) => boolean` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/keymap/index.ts#L48)

## :gear: registerTextEditor

普通的文本编辑器

| Function | Type |
| ---------- | ---------- |
| `registerTextEditor` | `(editor: Editor, leafer: ILeafer) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/editor/index.ts#L19)


# :wrench: Constants

- [VIEW_KEY](#gear-view_key)
- [theme](#gear-theme)
- [attrList](#gear-attrlist)

## :gear: VIEW_KEY

| Constant | Type |
| ---------- | ---------- |
| `VIEW_KEY` | `"__Y_MINDMAP_VIEW__"` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/view.ts#L9)

## :gear: theme

| Constant | Type |
| ---------- | ---------- |
| `theme` | `Theme` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/theme/index.ts#L2)

## :gear: attrList

| Constant | Type |
| ---------- | ---------- |
| `attrList` | `EditorAttrs[]` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/editor/text/index.ts#L16)


# :factory: Schema

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/schema/index.ts#L16)

## Methods

- [registerNode](#gear-registernode)
- [parseNode](#gear-parsenode)
- [createNode](#gear-createnode)

### :gear: registerNode

| Method | Type |
| ---------- | ---------- |
| `registerNode` | `(node: NodeType<NodeSpec<any>>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/schema/index.ts#L34)

### :gear: parseNode

parseNode from xmlElement

| Method | Type |
| ---------- | ---------- |
| `parseNode` | `(xml: YXmlElement<{ [key: string]: string; }> or YXmlText) => Node<any> or null` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/schema/index.ts#L55)

### :gear: createNode

createNode

| Method | Type |
| ---------- | ---------- |
| `createNode` | `(type: string or NodeType<NodeSpec<any>>, attrs: IAttrs, content: INodeContent) => Node<any>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/schema/index.ts#L63)


# :factory: NodeType

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/type.ts#L7)

## Methods

- [setSchema](#gear-setschema)
- [create](#gear-create)
- [parse](#gear-parse)
- [createNode](#gear-createnode)

### :gear: setSchema

| Method | Type |
| ---------- | ---------- |
| `setSchema` | `(schema: Schema) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/type.ts#L17)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(attrs?: IAttrs, content?: INodeContent, initYFragment?: YXmlElement<{ [key: string]: string; }> or YXmlText or null) => Node<any>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/type.ts#L21)

### :gear: parse

| Method | Type |
| ---------- | ---------- |
| `parse` | `(xml: YXmlElement<{ [key: string]: string; }> or YXmlText) => Node<any>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/type.ts#L45)

### :gear: createNode

| Method | Type |
| ---------- | ---------- |
| `createNode` | `<T extends NodeSpec<any>>(options: { name: string; } and T) => NodeType<T>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/type.ts#L49)


# :factory: Node

一个基础的node
作为定义转为yjs的代理

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/node.ts#L23)

## Methods

- [appendChild](#gear-appendchild)
- [removeChild](#gear-removechild)

### :gear: appendChild

| Method | Type |
| ---------- | ---------- |
| `appendChild` | `(node: Node<any>, reference?: Node<any> or undefined) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/node.ts#L74)

### :gear: removeChild

| Method | Type |
| ---------- | ---------- |
| `removeChild` | `(node: Node<any>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/node.ts#L81)


# :factory: State

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/state/index.ts#L25)

## Methods

- [create](#gear-create)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(data: Doc or Uint8Array or undefined, config: Omit<StateConfig, "doc" or "undoManager">) => State` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/state/index.ts#L77)


# :factory: View

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/view.ts#L11)

## Methods

- [pointFromPos](#gear-pointfrompos)
- [destroy](#gear-destroy)
- [nodeAt](#gear-nodeat)

### :gear: pointFromPos

| Method | Type |
| ---------- | ---------- |
| `pointFromPos` | `(pos: number, preferBefore: boolean) => { object: UI or null; offset: number; }` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/view.ts#L102)

### :gear: destroy

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/view.ts#L129)

### :gear: nodeAt

| Method | Type |
| ---------- | ---------- |
| `nodeAt` | `(node: Node<any>) => View<UI> or undefined` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/view.ts#L137)


# :factory: TextView

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/textView.ts#L4)

## Methods

- [pointFromPos](#gear-pointfrompos)

### :gear: pointFromPos

| Method | Type |
| ---------- | ---------- |
| `pointFromPos` | `(pos: number) => { object: Text or null; offset: number; }` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/textView.ts#L5)


# :factory: NodeView

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/nodeView.ts#L13)

## Methods

- [createChildView](#gear-createchildview)
- [removeChildView](#gear-removechildview)
- [getMatrix](#gear-getmatrix)

### :gear: createChildView

| Method | Type |
| ---------- | ---------- |
| `createChildView` | `(yFragment: YXmlElement<{ [key: string]: string; }> or YXmlText, index?: number) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/nodeView.ts#L47)

### :gear: removeChildView

移除子节点

| Method | Type |
| ---------- | ---------- |
| `removeChildView` | `(index: number, size: number) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/nodeView.ts#L72)

### :gear: getMatrix

| Method | Type |
| ---------- | ---------- |
| `getMatrix` | `(inner?: boolean or undefined) => Matrix` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/view/nodeView.ts#L77)


# :factory: BoardView

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/index.ts#L17)

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

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/index.ts#L68)

### :gear: toDataUrl

| Method | Type |
| ---------- | ---------- |
| `toDataUrl` | `(type?: "jpg" or "png" or "webp", quality?: number or undefined) => string or Promise<string>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/index.ts#L76)

### :gear: toSvg

转为svg的方法

| Method | Type |
| ---------- | ---------- |
| `toSvg` | `() => string or Promise<any>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/index.ts#L83)

### :gear: destroy

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/index.ts#L87)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(state: State, theme: Theme, options?: ViewOptions or undefined) => BoardView` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/index.ts#L92)


# :factory: CommandManager

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/command/index.ts#L10)

## Methods

- [registerCommands](#gear-registercommands)

### :gear: registerCommands

| Method | Type |
| ---------- | ---------- |
| `registerCommands` | `(rawCommands: RawCommands) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/command/index.ts#L18)


# :factory: Extension

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/extension/index.ts#L34)

## Methods

- [create](#gear-create)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(options: IExtensionOptions, boardOptions: Record<string, any>) => Extension<Record<string, any>, Record<string, any>>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/extension/index.ts#L61)


# :factory: ExtensionManager

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/extension/index.ts#L66)

## Methods

- [invokeUpdate](#gear-invokeupdate)
- [invokeCreate](#gear-invokecreate)
- [invokeDestroy](#gear-invokedestroy)
- [registerExtension](#gear-registerextension)

### :gear: invokeUpdate

| Method | Type |
| ---------- | ---------- |
| `invokeUpdate` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/extension/index.ts#L90)

### :gear: invokeCreate

| Method | Type |
| ---------- | ---------- |
| `invokeCreate` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/extension/index.ts#L101)

### :gear: invokeDestroy

| Method | Type |
| ---------- | ---------- |
| `invokeDestroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/extension/index.ts#L112)

### :gear: registerExtension

| Method | Type |
| ---------- | ---------- |
| `registerExtension` | `(extensions: Record<string, IExtensionConfig<any, any>>, defaultOptions: Record<string, any>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/extension/index.ts#L127)


# :factory: Board

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L33)

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

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L99)

### :gear: undo

| Method | Type |
| ---------- | ---------- |
| `undo` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L205)

### :gear: redo

| Method | Type |
| ---------- | ---------- |
| `redo` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L209)

### :gear: toDataUrl

| Method | Type |
| ---------- | ---------- |
| `toDataUrl` | `(type?: "jpg" or "png" or "webp", quality?: number or undefined) => string or Promise<string>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L213)

### :gear: toSvg

转为svg的方法

| Method | Type |
| ---------- | ---------- |
| `toSvg` | `() => string or Promise<any> or null` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L223)

### :gear: getData

| Method | Type |
| ---------- | ---------- |
| `getData` | `() => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L228)

### :gear: toString

| Method | Type |
| ---------- | ---------- |
| `toString` | `() => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L232)

### :gear: destroy

销毁的办法

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L240)


# :factory: TextEditor

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/editor/text/index.ts#L34)

## Methods

- [calculateDomStyle](#gear-calculatedomstyle)
- [destroy](#gear-destroy)

### :gear: calculateDomStyle

| Method | Type |
| ---------- | ---------- |
| `calculateDomStyle` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/editor/text/index.ts#L85)

### :gear: destroy

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/editor/text/index.ts#L194)


# :factory: Mindmap

网页版的mindmap
支持事件上的缩放，增加事件回调
同时如果获取了canvas的dom，就需要初始化一个quill editor

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/index.ts#L15)

## Methods

- [init](#gear-init)
- [initEditor](#gear-initeditor)
- [setEditable](#gear-seteditable)
- [destroy](#gear-destroy)

### :gear: init

| Method | Type |
| ---------- | ---------- |
| `init` | `(data: any) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/index.ts#L50)

### :gear: initEditor

| Method | Type |
| ---------- | ---------- |
| `initEditor` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/index.ts#L57)

### :gear: setEditable

| Method | Type |
| ---------- | ---------- |
| `setEditable` | `(value?: boolean) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/index.ts#L89)

### :gear: destroy

销毁的办法

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/browser/index.ts#L93)


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
| `addCommands` | `((this: Extension<IOptions, IStorage>, extension: Extension<IOptions, IStorage>) => RawCommands) or undefined` |  |
| `addNodes` | `((this: Board<any>) => Record<string, NodeType<NodeSpec<any>>>) or undefined` |  |
| `addOptions` | `((this: Extension<IOptions, IStorage>) => Record<string, any>) or undefined` |  |
| `addStorage` | `((this: Extension<IOptions, IStorage>) => Record<string, any>) or undefined` |  |
| `addKeymap` | `((this: Extension<IOptions, IStorage>) => Record<string, Command>) or undefined` |  |
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

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/spec.ts#L6)

## :gear: INodeContent

| Type | Type |
| ---------- | ---------- |
| `INodeContent` | `Array<XmlElement or XmlText or Node> or XmlElement or XmlText or string or null` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/model/node/node.ts#L5)

## :gear: ViewOptions

| Type | Type |
| ---------- | ---------- |
| `ViewOptions` | `{
    width?: number,
    height?: number,
    debug?: boolean,
    container?: any
}` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/view/index.ts#L10)

## :gear: IExtensionOptions

| Type | Type |
| ---------- | ---------- |
| `IExtensionOptions` | `IExtensionConfig and {
    name: string,
    board: Board
}` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/extension/index.ts#L29)

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

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/packages/core/board.ts#L19)

