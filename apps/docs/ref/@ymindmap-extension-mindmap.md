# :toolbox: Functions

- [createTopic](#gear-createtopic)
- [toCanvas](#gear-tocanvas)
- [string2Yjs](#gear-string2yjs)
- [yjs2string](#gear-yjs2string)
- [getDefaultData](#gear-getdefaultdata)
- [getClassName](#gear-getclassname)
- [connectNodeView](#gear-connectnodeview)
- [createLine](#gear-createline)
- [nonLayeredTidyTree](#gear-nonlayeredtidytree)
- [right2left](#gear-right2left)
- [layout](#gear-layout)
- [layout](#gear-layout)
- [layout](#gear-layout)
- [moveRootMindmapToCenter](#gear-moverootmindmaptocenter)
- [createSubTopic](#gear-createsubtopic)
- [Tab](#gear-tab)

## :gear: createTopic

| Function | Type |
| ---------- | ---------- |
| `createTopic` | `(node: Node<ITopicNodeAttrs>, context: NodeToCanvasContext) => Box` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/schema/nodes/topic/render.ts#L31)

## :gear: toCanvas

| Function | Type |
| ---------- | ---------- |
| `toCanvas` | `(node: Node<ITopicNodeAttrs and { marginHeight: string; marginWidth: string; childMarginHeight: string; childMarginWidth: string; theme: string; structure: string; left?: string or undefined; top?: string or undefined; }>, context: NodeToCanvasContext) => Box` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/schema/nodes/mindmap.ts#L45)

## :gear: string2Yjs

| Function | Type |
| ---------- | ---------- |
| `string2Yjs` | `(xmlString: string) => Uint8Array` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/bridge/index.ts#L17)

## :gear: yjs2string

| Function | Type |
| ---------- | ---------- |
| `yjs2string` | `(doc: Doc) => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/bridge/index.ts#L48)

## :gear: getDefaultData

| Function | Type |
| ---------- | ---------- |
| `getDefaultData` | `() => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/config/defaultData.ts#L3)

## :gear: getClassName

| Function | Type |
| ---------- | ---------- |
| `getClassName` | `(from: NodeView, to: NodeView) => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/lib/edgeLine.ts#L14)

## :gear: connectNodeView

| Function | Type |
| ---------- | ---------- |
| `connectNodeView` | `(this: EdgeLine) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/lib/edgeLine.ts#L20)

## :gear: createLine

| Function | Type |
| ---------- | ---------- |
| `createLine` | `(this: ILayoutController, from: NodeView, to: NodeView, isHorizontal: boolean) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/lib/edgeLine.ts#L153)

## :gear: nonLayeredTidyTree

| Function | Type |
| ---------- | ---------- |
| `nonLayeredTidyTree` | `(this: ILayoutController, nodeView: NodeView, isHorizontal: boolean or undefined, children: View<UI>[], offset?: number) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/lib/nonLayeredTidyTree.ts#L112)

## :gear: right2left

右侧的树基于某个节点自动旋转

| Function | Type |
| ---------- | ---------- |
| `right2left` | `(reference: NodeView, child?: NodeView[] or undefined) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/lib/rightToLeft.ts#L11)

## :gear: layout

获取一个节点是左侧还是右侧

| Function | Type |
| ---------- | ---------- |
| `layout` | `(this: ILayoutController, node: View<UI>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/standard.ts#L32)

## :gear: layout

| Function | Type |
| ---------- | ---------- |
| `layout` | `(this: ILayoutController, node: View<UI>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/left.ts#L9)

## :gear: layout

| Function | Type |
| ---------- | ---------- |
| `layout` | `(this: ILayoutController, node: View<UI>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/right.ts#L8)

## :gear: moveRootMindmapToCenter

移动到中心

| Function | Type |
| ---------- | ---------- |
| `moveRootMindmapToCenter` | `() => Command` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/commands/moveToCenter.ts#L12)

## :gear: createSubTopic

创建子节点

| Function | Type |
| ---------- | ---------- |
| `createSubTopic` | `(topic: Node<any>, storage: IStorage) => Command` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/commands/createSubTopic.ts#L17)

## :gear: Tab

| Function | Type |
| ---------- | ---------- |
| `Tab` | `(state: State, view: BoardView) => boolean` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/index.ts#L42)


# :wrench: Constants

- [VIEW_KEY](#gear-view_key)
- [theme](#gear-theme)
- [topic](#gear-topic)
- [CLASS_NAME](#gear-class_name)
- [structures](#gear-structures)

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

## :gear: topic

| Constant | Type |
| ---------- | ---------- |
| `topic` | `NodeType<NodeSpec<ITopicNodeAttrs>>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/schema/nodes/topic/index.ts#L6)

## :gear: CLASS_NAME

| Constant | Type |
| ---------- | ---------- |
| `CLASS_NAME` | `"_mindmap-edge-line_"` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/lib/edgeLine.ts#L12)

## :gear: structures

| Constant | Type |
| ---------- | ---------- |
| `structures` | `{ left: (this: ILayoutController, node: View<UI>) => void; right: (this: ILayoutController, node: View<UI>) => void; standard: (this: ILayoutController, node: View<...>) => void; }` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/index.ts#L5)


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


# :factory: CommandManager

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/command/index.ts#L10)

## Methods

- [registerCommands](#gear-registercommands)

### :gear: registerCommands

| Method | Type |
| ---------- | ---------- |
| `registerCommands` | `(rawCommands: RawCommands) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/command/index.ts#L18)


# :factory: Extension

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/extension/index.ts#L34)

## Methods

- [create](#gear-create)

### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(options: IExtensionOptions, boardOptions: Record<string, any>) => Extension<Record<string, any>, Record<string, any>>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/extension/index.ts#L61)


# :factory: ExtensionManager

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/extension/index.ts#L66)

## Methods

- [invokeUpdate](#gear-invokeupdate)
- [invokeCreate](#gear-invokecreate)
- [invokeDestroy](#gear-invokedestroy)
- [registerExtension](#gear-registerextension)

### :gear: invokeUpdate

| Method | Type |
| ---------- | ---------- |
| `invokeUpdate` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/extension/index.ts#L90)

### :gear: invokeCreate

| Method | Type |
| ---------- | ---------- |
| `invokeCreate` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/extension/index.ts#L101)

### :gear: invokeDestroy

| Method | Type |
| ---------- | ---------- |
| `invokeDestroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/extension/index.ts#L112)

### :gear: registerExtension

| Method | Type |
| ---------- | ---------- |
| `registerExtension` | `(extensions: Record<string, IExtensionConfig<any, any>>, defaultOptions: Record<string, any>) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/extension/index.ts#L127)


# :factory: Board

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L33)

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

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L99)

### :gear: undo

| Method | Type |
| ---------- | ---------- |
| `undo` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L205)

### :gear: redo

| Method | Type |
| ---------- | ---------- |
| `redo` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L209)

### :gear: toDataUrl

| Method | Type |
| ---------- | ---------- |
| `toDataUrl` | `(type?: "jpg" or "png" or "webp", quality?: number or undefined) => string or Promise<string>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L213)

### :gear: toSvg

转为svg的方法

| Method | Type |
| ---------- | ---------- |
| `toSvg` | `() => string or Promise<any> or null` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L223)

### :gear: getData

| Method | Type |
| ---------- | ---------- |
| `getData` | `() => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L228)

### :gear: toString

| Method | Type |
| ---------- | ---------- |
| `toString` | `() => string` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L232)

### :gear: destroy

销毁的办法

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L240)


# :factory: EdgeLine

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/lib/edgeLine.ts#L101)

# :factory: LayoutController

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/index.ts#L21)

## Methods

- [setStructure](#gear-setstructure)
- [setMargin](#gear-setmargin)
- [doLayout](#gear-dolayout)
- [handleMindmapUpdate](#gear-handlemindmapupdate)
- [destroy](#gear-destroy)

### :gear: setStructure

| Method | Type |
| ---------- | ---------- |
| `setStructure` | `(structure: string) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/index.ts#L80)

### :gear: setMargin

| Method | Type |
| ---------- | ---------- |
| `setMargin` | `(margin: IMargin) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/index.ts#L85)

### :gear: doLayout

| Method | Type |
| ---------- | ---------- |
| `doLayout` | `(nodeView?: NodeView) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/index.ts#L89)

### :gear: handleMindmapUpdate

| Method | Type |
| ---------- | ---------- |
| `handleMindmapUpdate` | `(e: PropertyEvent) => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/index.ts#L93)

### :gear: destroy

| Method | Type |
| ---------- | ---------- |
| `destroy` | `() => void` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/index.ts#L116)


# :tropical_drink: Interfaces

- [NodeSpec](#gear-nodespec)
- [ISchemaSpec](#gear-ischemaspec)
- [StateConfig](#gear-stateconfig)
- [IExtensionConfig](#gear-iextensionconfig)
- [IEdgeLineData](#gear-iedgelinedata)

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


## :gear: IEdgeLineData



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `from` | `NodeView` |  |
| `to` | `NodeView` |  |
| `isHorizontal` | `boolean` |  |
| `mode` | `IEdgeLineMode or undefined` |  |


# :cocktail: Types

- [NodeToCanvasContext](#gear-nodetocanvascontext)
- [INodeContent](#gear-inodecontent)
- [ViewOptions](#gear-viewoptions)
- [IExtensionOptions](#gear-iextensionoptions)
- [Options](#gear-options)
- [IEdgeLineMode](#gear-iedgelinemode)
- [IOptions](#gear-ioptions)
- [IStorage](#gear-istorage)

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

## :gear: IExtensionOptions

| Type | Type |
| ---------- | ---------- |
| `IExtensionOptions` | `IExtensionConfig and {
    name: string,
    board: Board
}` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/extension/index.ts#L29)

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

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../packages/core/board.ts#L19)

## :gear: IEdgeLineMode

| Type | Type |
| ---------- | ---------- |
| `IEdgeLineMode` | `'curve' or 'direct' or 'corner' or 'bezier'` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/layout/structure/lib/edgeLine.ts#L18)

## :gear: IOptions

| Type | Type |
| ---------- | ---------- |
| `IOptions` | `NonNullable<unknown>` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/index.ts#L13)

## :gear: IStorage

| Type | Type |
| ---------- | ---------- |
| `IStorage` | `{
    nodeLayoutControllerMap: WeakMap<NodeView, LayoutController>
}` |

[:link: Source](https://github.com/ymindmap/ymindmap/tree/main/../extensions/extension-mindmap/index.ts#L14)

