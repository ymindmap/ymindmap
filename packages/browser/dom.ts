/**
 * 生成domElement
 * @todo 考虑销毁相关问题
 */
getElement() {
    if (this.dom) return this.dom;
    // 自动生成绑定的dom元素
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.dom = (this.canvas as unknown as any).wrapperEl;
    /**
     * @todo 迁移为单独方法
     */
    bindEvent(this.canvas, { minZoom: 0.1, maxZoom: 3 });

    return this.dom;
}