export class DomainException extends Error {
    constructor(content: string) {
        super(content);
    }
}