interface CacheEntry<Value> {
  value: Value;
  expiresAt: number;
}

interface CacheOptions {
  maxEntries: number;
  ttlMs: number;
  now?: () => number;
}

export class Cache<Key, Value> {
  private readonly store = new Map<Key, CacheEntry<Value>>();
  private readonly maxEntries: number;
  private readonly ttlMs: number;
  private readonly now: () => number;

  constructor({ maxEntries, ttlMs, now = Date.now }: CacheOptions) {
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMs;
    this.now = now;
  }

  get(key: Key): Value | undefined {
    const entry = this.store.get(key);
    if (!entry) {
      return undefined;
    }

    if (entry.expiresAt <= this.now()) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  set(key: Key, value: Value): void {
    this.pruneExpired();
    this.store.delete(key);
    this.store.set(key, {
      value,
      expiresAt: this.now() + this.ttlMs
    });

    while (this.store.size > this.maxEntries) {
      const oldest = this.store.keys().next();
      if (oldest.done) {
        return;
      }
      this.store.delete(oldest.value);
    }
  }

  private pruneExpired(): void {
    const now = this.now();
    for (const [key, entry] of this.store) {
      if (entry.expiresAt <= now) {
        this.store.delete(key);
      }
    }
  }
}
