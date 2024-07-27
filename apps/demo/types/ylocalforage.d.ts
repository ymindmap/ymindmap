declare module 'y-localforage' {
    export class LocalForageProvider {
        constructor(Store: any, sharedDoc: Y.Doc, UpdateLimit: number = 500);

        on(event: string, handler: (provider: LocalForageProvider) => void): void
    }
}