/**
 * 一个简单的富文本编辑器，主要是实现了双击编辑能力
 * 不过与其说是富文本编辑器，不如说是只是将style应用了上去
 * @todo 支持读取text支持的样式
 * @todo 支持latex，支持编辑中变成公式，编辑外变成svg
 */
import type {
    IText,
    // IUIJSONData,
    ITextDecoration,
    ITextStyleComputedData,
} from '@leafer-ui/interface'
import { getPadding } from '../../utils';

type EditorAttrs = keyof ITextStyleComputedData | 'fill'
export const attrList: EditorAttrs[] = [
    "fill",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "italic",
    "letterSpacing",
    "lineHeight",
    "paraIndent",
    "paraSpacing",
    "textAlign",
    "textCase",
    "textDecoration",
    "textOverflow",
    "textWrap",
    "verticalAlign"
]

export class TextEditor {
    public containerEl: HTMLDivElement;
    private editorEl: HTMLDivElement;
    // private originData: IUIJSONData;
    private originUI: IText;
    private ob: MutationObserver;
    constructor(text: IText, reference: HTMLElement) {
        this.containerEl = document.createElement('div');
        this.editorEl = document.createElement("div");
        this.editorEl.contentEditable = 'true';
        // this.originData = text.toJSON();
        this.containerEl.appendChild(this.editorEl);
        this.editorEl.innerText = text.text || '';

        /**
         * 根据当前节点位置确定位置
         * 先重新聚焦到编辑状态后
         */
        const { a, d, e, f } = text.getTransform('world');
        reference.appendChild(this.containerEl);
        this.editorEl.onblur = this.destroy.bind(this);
        this.editorEl.focus();
        this.containerEl.style.position = 'absolute';
        this.containerEl.style.left = e + 'px';
        this.containerEl.style.top = f + 'px';
        // 缩放关系 + padding关系
        const [topPadding, rightPadding, bottomPadding, leftPadding] = getPadding(text.padding || 0);
        this.containerEl.style.paddingTop = topPadding + 'px';
        this.containerEl.style.paddingRight = rightPadding + 'px';
        this.containerEl.style.paddingBottom = bottomPadding + 'px';
        this.containerEl.style.paddingLeft = leftPadding + 'px';
        this.containerEl.style.transformOrigin = 'top left';
        this.containerEl.style.transform = `scale(${a}, ${d})`;

        this.originUI = text;
        this.originUI.opacity = 0;

        this.calculateDomStyle();
        this.ob = new MutationObserver(([record]) => {
            if (record.type === 'characterData') {
                this.originUI.setAttr('text', this.editorEl.innerText);
            } else {
                // 更新属性
            }
        });

        requestAnimationFrame(() => {
            this.ob.observe(this.editorEl, { characterData: true, subtree: true });
        })
    }

    calculateDomStyle(): void {
        // 计算map然后自动设置
        let styleAttr = 'outline: none;';


        attrList.forEach((key) => {
            const value: any = this.originUI.getAttr(key);
            switch (key as EditorAttrs) {
                case 'fill': {
                    styleAttr += `color: ${value};`
                    break;
                }
                case 'fontFamily': {
                    styleAttr += `font-family: ${value};`;
                    break;
                }
                case 'fontSize': {
                    styleAttr += `font-size: ${value}px;`;
                    break;
                }
                case 'fontWeight': {
                    styleAttr += `font-weight: ${value};`;
                    break;
                }
                case 'italic': {
                    styleAttr += `font-style: italic;`;
                    break;
                }
                case 'textCase': {
                    /**
                     * @see https://www.w3schools.com/cssref/playdemo.php?filename=playcss_font-variant-caps
                     */
                    switch (value) {
                        case 'upper': {
                            styleAttr += 'text-transform: uppercase;';
                            break;
                        }
                        case 'lower': {
                            styleAttr += 'text-transform: lowercase;';
                            break;
                        }
                        case 'title': {
                            styleAttr += 'font-variant: titling-caps;';
                            break;
                        }
                        case 'none': {
                            styleAttr += 'font-variant: normal;';
                            break;
                        }
                        case 'small-caps': {
                            styleAttr += 'font-variant: small-caps;';
                            break;
                        }
                        default: break;
                    }
                    break;
                }
                case 'textDecoration': {
                    const textDecorationMap: {
                        [key in ITextDecoration]: string
                    } = {
                        'none': 'none',
                        'delete': 'line-through',
                        'under': 'underline'
                    }
                    styleAttr += `text-decoration: ${textDecorationMap[value as ITextDecoration]};`;
                    break;
                }
                case 'letterSpacing': {
                    styleAttr += `letter-spacing: ${value}px;`;
                    break;
                }
                // case 'lineHeight': {
                //     styleAttr += `line-height: ${value.value ? value.value : value}px;`;
                //     break;
                // }
                case 'paraIndent': {
                    styleAttr += `text-indent: ${value}px;`;
                    break;
                }
                case 'paraSpacing': {
                    styleAttr += `margin-top: ${value}px;`;
                    break;
                }
                case 'textAlign': {
                    styleAttr += `text-align: ${value};`;
                    break;
                }
                case 'verticalAlign': {
                    styleAttr += `vertical-align: ${value};`;
                    break;
                }
                /** @todo 需要测试 */
                case 'textWrap': {
                    styleAttr += ` white-space: ${value === 'break' ? 'normal' : 'nowrap'};`;
                    break;
                }
                /** @todo 需要测试 */
                case 'textOverflow': {
                    styleAttr += `overflow: ${value === 'show' ? 'visible' : 'hidden'};`;
                    break;
                }
                default: break;
            }
        })

        this.editorEl.setAttribute('style', styleAttr);
    }

    destroy() {
        this.originUI.opacity = 1;
        this.ob.disconnect();
        if (this.containerEl.parentElement) {
            this.containerEl.parentElement.removeChild(this.containerEl);
        }
    }
}