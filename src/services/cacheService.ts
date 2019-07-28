const cache: { [key: string]: string | undefined } = {};

export async function putIntoCache<T>(key: string, item: T): Promise<boolean> {
    if (item === undefined) {
        return false;
    }

    cache[key] = JSON.stringify(item);
    return true;
}

export async function getFromCache<T>(key: string): Promise<T | undefined> {
    const item: string | undefined = cache[key];

    return item === undefined ?
        undefined :
        JSON.parse(item);
}
