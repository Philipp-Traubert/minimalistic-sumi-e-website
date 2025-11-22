declare module 'figma:asset/*.png' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}
