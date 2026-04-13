declare module "*.css" {
    const content: string;
    export default content;
}

interface SpicetifyApi {
    React: any;
    ReactDOM: any;
    Platform: any;
    Playbar: any;
    showNotification: (text: string) => void;
    [key: string]: any;
}

declare const Spicetify: SpicetifyApi;

// This allows us to use JSX without 'any' errors in the IDE
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
