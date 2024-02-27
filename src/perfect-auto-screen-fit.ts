interface AutofitOptions {
	el?: string; // 目标元素选择器，默认为'body'
	dw?: number; // 设计稿宽度，默认1920
	dh?: number; // 设计稿高度，默认1080
	resize?: boolean; // 是否监听窗口大小变化，默认true
	transition?: string; // 缩放过渡效果，默认'none'
	delay?: number; // 延迟应用缩放的时间，默认0
	limit?: number; // 缩放比例下限，默认0.1，防止过小
}
export default {
	currRenderDom: null as string | null, // 当前渲染的DOM元素选择器
	currScale: 1, // 当前缩放比例
	resizeListener: null as (() => void) | null, // 窗口大小变化监听函数
	timer: null as number | null, // 延迟执行的计时器

	// 初始化函数
	init(options: AutofitOptions = {}, isShowInitTip: boolean = true): void {
		// 显示初始化提示
		if (isShowInitTip)
			console.log(
				"%cZhang autofit.js is running",
				"color: #1e80ff; font-size: 20px; background: #fff; padding: 8px;"
			);
		const {
			el = "body",
			dw = 1920,
			dh = 1080,
			resize = true,
			transition = ".8s",
			delay = 0,
			limit = 0.1,
		} = options;

		this.currRenderDom = el;
		const dom = document.querySelector(el);
		if (!dom) return console.error(`autofit: '${el}' does not exist`);

		// 应用基础样式
		this.applyBaseStyles(dw, dh, dom as HTMLElement, limit, transition);

		// 设置窗口大小变化监听
		if (resize) {
			this.setupResizeListener(dw, dh, dom as HTMLElement, limit, delay);
		}
	},

	// 应用基础样式
	applyBaseStyles(
		dw: number,
		dh: number,
		dom: HTMLElement,
		limit: number,
		transition: string
	): void {
		dom.style.cssText = `height: ${dh}px; width: ${dw}px; transform-origin: 0 0; overflow: hidden;`;
		this.keepFit(dw, dh, dom, limit);
		// 使用requestAnimationFrame来优化动画和过渡效果
		requestAnimationFrame(
			() => (dom.style.transition = `transform ${transition}`)
		);
	},

	// 设置窗口大小变化监听
	setupResizeListener(
		dw: number,
		dh: number,
		dom: HTMLElement,
		limit: number,
		delay: number
	): void {
		// 使用debounce减少resize事件的触发频率
		const debouncedResize = this.debounce(
			() => this.keepFit(dw, dh, dom, limit),
			delay
		);
		this.resizeListener = () => {
			debouncedResize();
		};
		window.addEventListener("resize", this.resizeListener, { passive: true });
	},

	// 保持元素适应屏幕
	keepFit(dw: number, dh: number, dom: HTMLElement, limit: number): void {
		const clientHeight = document.documentElement.clientHeight;
		const clientWidth = document.documentElement.clientWidth;
		this.currScale = Math.max(
			Math.min(clientWidth / dw, clientHeight / dh),
			limit
		);

		const height = Math.round(clientHeight / this.currScale);
		const width = Math.round(clientWidth / this.currScale);
		const cssText = `height: ${height}px; width: ${width}px; transform: scale(${this.currScale});`;
		// 使用requestAnimationFrame一次性应用所有样式变更
		requestAnimationFrame(() => (dom.style.cssText += cssText));
	},

	// 防抖函数
	debounce(func: Function, wait: number): () => void {
		let timeout: number | null = null;
		return (...args: any[]) => {
			clearTimeout(timeout ?? 0);
			timeout = window.setTimeout(() => {
				func.apply(this, args);
			}, wait) as unknown as number;
		};
	},

	// 关闭自适应功能
	off(): void {
		if (this.resizeListener) {
			window.removeEventListener("resize", this.resizeListener);
			this.resizeListener = null;
		}
		clearTimeout(this.timer ?? 0);
		this.timer = null;

		const dom = document.querySelector(this.currRenderDom ?? "body");
		if (dom) {
			dom.removeAttribute("style");
		} else console.error(`Element ${this.currRenderDom} not found.`);

		console.log(
			"%cZhang autofit.js is off",
			"color: #fff; font-size: 20px; background: #ce5c04; padding: 8px;"
		);
	},
};
