/**
 * A tiny keyed, in-memory cache. Used to avoid refetching the same Flickr query
 * when navigating back to a previously visited route. Lives only for the
 * current page session.
 */
export class Cache<Key, Value> {
  private readonly store = new Map<Key, Value>();

  get(key: Key): Value | undefined {
    return this.store.get(key);
  }

  set(key: Key, value: Value): void {
    this.store.set(key, value);
  }

  has(key: Key): boolean {
    return this.store.has(key);
  }

  clear(): void {
    this.store.clear();
  }
}
