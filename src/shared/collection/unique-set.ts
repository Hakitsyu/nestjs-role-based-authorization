export type UniqueSetKeyPredicate<T, TKey> = (entity: T) => TKey;

export class UniqueSet<T, TKey> implements Iterable<T> {
    private entities: T[] = [];

    constructor(private readonly keyPredicate: UniqueSetKeyPredicate<T, TKey>, entities?: T[]) 
    { 
        if (entities)
            this.entities = entities;
    }

    add(value: T) {
        if (!this.has(value))
            this.entities.push(value);
    }

    delete(entity: T) {
        const key = this.keyPredicate(entity);
        if (this.hasByKey(key))
            this.entities = this.entities.filter(e => this.keyPredicate(e) !== key);
    }

    clear() {
        this.entities = [];
    }

    findByKey(key: TKey): T | undefined {
        return this.entities.find(e => this.keyPredicate(e) === key);   
    }

    hasByKey(key: TKey): boolean {
        return this.findByKey(key) !== undefined;
    }

    has(entity: T): boolean {
        return this.hasByKey(this.keyPredicate(entity));
    }

    asArray() {
        return Array.from(this);
    }

    get size() {
        return this.entities.length;
    }

    *[Symbol.iterator](): IterableIterator<T> {
        for (const value of this.entities.values())
            yield value;
    }
}