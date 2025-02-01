declare module 'dom-to-image-more' {
    const content: {
        toPng: (node: HTMLElement, options?: any) => Promise<string>;
    };
    export default content;
} 