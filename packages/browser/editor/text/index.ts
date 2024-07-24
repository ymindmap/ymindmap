/**
 * 一个简单的富文本编辑器，主要是实现了双击编辑能力
 * 不过与其说是富文本编辑器，不如说是只是将style应用了上去
 * @todo 支持读取text支持的样式
 * @todo 支持latex，支持编辑中变成公式，编辑外变成svg
 */
import type { ITextDecoration, ITextStyleComputedData } from '@leafer-ui/interface'

export class TextEditor {
    public containerEl: HTMLDivElement;
    private editorEl: HTMLDivElement;
    private text: string
    private _textStyle: ITextStyleComputedData = {};
    constructor(originText = '', style: ITextStyleComputedData = {}) {
        this.containerEl = document.createElement('div');
        this.editorEl = document.createElement("div");
        this.editorEl.contentEditable = 'true';
        this.textStyle = style;
        this.text = originText;
    }

    get _text() {
        // 这里需要考虑双击编辑的情况，如果正在编辑则返回 editorEl 的内容
        return this.editorEl.textContent || this.text;
    }
    set _text(value: string) {
        this.text = value;
        this.editorEl.textContent = value;
    }

    get textStyle(): ITextStyleComputedData {
        return this._textStyle;
    }

    set textStyle(value: ITextStyleComputedData) {
        this._textStyle = value;
        this.calculateDomStyle();
    }

    calculateDomStyle(): void {
        // 计算map然后自动设置
        let styleAttr = '';

        Object.keys(this.textStyle).forEach((key) => {
            const value: any = this.textStyle[key as keyof ITextStyleComputedData];
            switch (key as keyof ITextStyleComputedData) {
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
                case 'lineHeight': {
                    styleAttr += `line-height: ${value}px;`;
                    break;
                }
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
                    styleAttr += `overflow: ${value}`;
                    break;
                }
                default: break;
            }
        })

        this.editorEl.setAttribute('style', styleAttr);
    }
}