/**
 * 模型的各类配置
 * 基于yjs
 */
export interface IAttrs {
    [key: string]: string;
}

export interface IAttrSpec {
    default?: string | (() => string);
}