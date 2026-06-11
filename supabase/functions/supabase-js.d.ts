// Type declarations for @supabase/supabase-js used via npm: specifier in Supabase Edge Functions
// This enables VS Code IntelliSense for the `npm:@supabase/supabase-js@2` import.

declare module 'npm:@supabase/supabase-js@2' {
  // ── Result type ──────────────────────────────────────────────────
  interface PostgrestResponse<T> {
    data: T | null;
    error: Error | null;
    count: number | null;
    status: number;
    statusText: string;
  }

  // ── Filter builder — has .eq() / .select() / .single() etc. ──
  interface PostgrestFilterBuilder<T, R, Relation> {
    then<Result>(resolve: (value: PostgrestResponse<R>) => Result | PromiseLike<Result>): Promise<Result>;
    eq(column: keyof Relation | string, value: unknown): this;
    neq(column: keyof Relation | string, value: unknown): this;
    gt(column: keyof Relation | string, value: unknown): this;
    gte(column: keyof Relation | string, value: unknown): this;
    lt(column: keyof Relation | string, value: unknown): this;
    lte(column: keyof Relation | string, value: unknown): this;
    like(column: keyof Relation | string, pattern: string): this;
    ilike(column: keyof Relation | string, pattern: string): this;
    is(column: keyof Relation | string, value: unknown): this;
    in(column: keyof Relation | string, values: unknown[]): this;
    contains(column: keyof Relation | string, value: unknown): this;
    containedBy(column: keyof Relation | string, value: unknown): this;
    rangeGt(column: keyof Relation | string, range: string): this;
    rangeGte(column: keyof Relation | string, range: string): this;
    rangeLt(column: keyof Relation | string, range: string): this;
    rangeLte(column: keyof Relation | string, range: string): this;
    rangeAdjacent(column: keyof Relation | string, range: string): this;
    overlaps(column: keyof Relation | string, range: string): this;
    textSearch(column: keyof Relation | string, query: string, options?: { type?: 'plain' | 'phrase' | 'websearch'; config?: string }): this;
    filter(column: keyof Relation | string, operator: string, value: unknown): this;
    not(column: keyof Relation | string, operator: string, value: unknown): this;
    or(filters: string, options?: { foreignTable?: string }): this;
    order(column: keyof Relation | string, options?: { ascending?: boolean; nullsFirst?: boolean; foreignTable?: string }): this;
    limit(count: number, options?: { foreignTable?: string }): this;
    range(start: number, end: number, options?: { foreignTable?: string }): this;
    single(): PostgrestFilterBuilder<T, T extends any[] ? T[number] : T, Relation>;
    maybeSingle(): PostgrestFilterBuilder<T, T extends any[] ? T[number] : T, Relation>;
    csv(): Promise<string>;
    select(columns?: string): PostgrestFilterBuilder<T, T[], Relation>;
  }

  // ── Mutate filter — after upsert/insert/update/delete, chain .select()/.single() ──
  interface PostgrestMutateBuilder<T, Relation> {
    then<Result>(resolve: (value: PostgrestResponse<null>) => Result | PromiseLike<Result>): Promise<Result>;
    eq(column: keyof Relation | string, value: unknown): this;
    neq(column: keyof Relation | string, value: unknown): this;
    gt(column: keyof Relation | string, value: unknown): this;
    gte(column: keyof Relation | string, value: unknown): this;
    lt(column: keyof Relation | string, value: unknown): this;
    lte(column: keyof Relation | string, value: unknown): this;
    like(column: keyof Relation | string, pattern: string): this;
    ilike(column: keyof Relation | string, pattern: string): this;
    is(column: keyof Relation | string, value: unknown): this;
    in(column: keyof Relation | string, values: unknown[]): this;
    contains(column: keyof Relation | string, value: unknown): this;
    containedBy(column: keyof Relation | string, value: unknown): this;
    rangeGt(column: keyof Relation | string, range: string): this;
    rangeGte(column: keyof Relation | string, range: string): this;
    rangeLt(column: keyof Relation | string, range: string): this;
    rangeLte(column: keyof Relation | string, range: string): this;
    rangeAdjacent(column: keyof Relation | string, range: string): this;
    overlaps(column: keyof Relation | string, range: string): this;
    textSearch(column: keyof Relation | string, query: string, options?: { type?: 'plain' | 'phrase' | 'websearch'; config?: string }): this;
    filter(column: keyof Relation | string, operator: string, value: unknown): this;
    not(column: keyof Relation | string, operator: string, value: unknown): this;
    or(filters: string, options?: { foreignTable?: string }): this;
    order(column: keyof Relation | string, options?: { ascending?: boolean; nullsFirst?: boolean; foreignTable?: string }): this;
    limit(count: number, options?: { foreignTable?: string }): this;
    range(start: number, end: number, options?: { foreignTable?: string }): this;
    select(columns?: string): PostgrestFilterBuilder<T, T[], Relation>;
    single(): PostgrestFilterBuilder<T, T, Relation>;
    maybeSingle(): PostgrestFilterBuilder<T, T, Relation>;
    csv(): Promise<string>;
  }

  // ── Query builder — from() returns this ──────────────────────
  interface PostgrestQueryBuilder<T, Relation> {
    select(columns?: string): PostgrestFilterBuilder<T, T[], Relation>;
    insert(values: Partial<T> | Partial<T>[], options?: { onConflict?: string; ignoreDuplicates?: boolean }): PostgrestMutateBuilder<T, Relation>;
    upsert(values: Partial<T> | Partial<T>[], options?: { onConflict?: string; ignoreDuplicates?: boolean }): PostgrestMutateBuilder<T, Relation>;
    update(values: Partial<T>): PostgrestMutateBuilder<T, Relation>;
    delete(): PostgrestMutateBuilder<T, Relation>;
    eq(column: keyof Relation | string, value: unknown): PostgrestFilterBuilder<T, T[], Relation>;
    neq(column: keyof Relation | string, value: unknown): PostgrestFilterBuilder<T, T[], Relation>;
    gt(column: keyof Relation | string, value: unknown): PostgrestFilterBuilder<T, T[], Relation>;
    gte(column: keyof Relation | string, value: unknown): PostgrestFilterBuilder<T, T[], Relation>;
    lt(column: keyof Relation | string, value: unknown): PostgrestFilterBuilder<T, T[], Relation>;
    lte(column: keyof Relation | string, value: unknown): PostgrestFilterBuilder<T, T[], Relation>;
    like(column: keyof Relation | string, pattern: string): PostgrestFilterBuilder<T, T[], Relation>;
    ilike(column: keyof Relation | string, pattern: string): PostgrestFilterBuilder<T, T[], Relation>;
    is(column: keyof Relation | string, value: unknown): PostgrestFilterBuilder<T, T[], Relation>;
    in(column: keyof Relation | string, values: unknown[]): PostgrestFilterBuilder<T, T[], Relation>;
    order(column: keyof Relation | string, options?: { ascending?: boolean; nullsFirst?: boolean }): PostgrestFilterBuilder<T, T[], Relation>;
    limit(count: number): PostgrestFilterBuilder<T, T[], Relation>;
    single(): PostgrestFilterBuilder<T, T[], Relation>;
    maybeSingle(): PostgrestFilterBuilder<T, T[], Relation>;
    range(start: number, end: number): PostgrestFilterBuilder<T, T[], Relation>;
  }

  // ── Real-time types ──────────────────────────────────────────────
  interface RealtimePostgresChangesPayload<T> {
    schema: string;
    table: string;
    commit_timestamp: string;
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new: Partial<T>;
    old: Partial<T>;
    errors: string[];
  }

  interface RealtimeChannel {
    on<T>(
      type: 'postgres_changes',
      filter: { event: '*' | 'INSERT' | 'UPDATE' | 'DELETE'; schema: string; table?: string; filter?: string },
      callback: (payload: RealtimePostgresChangesPayload<T>) => void
    ): this;
    subscribe(callback?: (status: 'SUBSCRIBED' | 'TIMED_OUT' | 'CLOSED' | 'CHANNEL_ERROR', err?: Error) => void): this;
    unsubscribe(): void;
  }

  // ── Client options ───────────────────────────────────────────────
  interface SupabaseClientOptions<SchemaName> {
    auth?: {
      autoRefreshToken?: boolean;
      persistSession?: boolean;
      detectSessionInUrl?: boolean;
      storage?: Storage;
      storageKey?: string;
      flowType?: 'implicit' | 'pkce';
      debug?: boolean;
      headers?: Record<string, string>;
    };
    db?: {
      schema?: string;
    };
    global?: {
      headers?: Record<string, string>;
      fetch?: typeof fetch;
    };
    realtime?: {
      params?: {
        eventsPerSecond?: number;
      };
    };
  }

  // ── Supabase client ──────────────────────────────────────────────
  interface SupabaseClient<T = any, SchemaName = any> {
    from<TableName extends string>(
      table: TableName
    ): PostgrestQueryBuilder<T, Record<string, unknown>>;
    rpc<ReturnType = unknown>(
      fn: string,
      params?: Record<string, unknown>
    ): Promise<{ data: ReturnType | null; error: Error | null }>;
    auth: {
      signUp(credentials: { email: string; password: string; options?: { data?: Record<string, unknown>; redirectTo?: string } }): Promise<{ data: { user: unknown | null; session: unknown | null }; error: Error | null }>;
      signInWithPassword(credentials: { email: string; password: string }): Promise<{ data: { user: unknown | null; session: unknown | null }; error: Error | null }>;
      signOut(): Promise<{ error: Error | null }>;
      getSession(): Promise<{ data: { session: unknown | null }; error: Error | null }>;
      getUser(jwt?: string): Promise<{ data: { user: unknown | null }; error: Error | null }>;
      onAuthStateChange(callback: (event: string, session: unknown) => void): { data: { subscription: { unsubscribe: () => void } } };
    };
    storage: {
      from(bucket: string): {
        upload(path: string, file: File | Blob | ArrayBuffer, options?: { contentType?: string; cacheControl?: string; upsert?: boolean }): Promise<{ data: { path: string } | null; error: Error | null }>;
        download(path: string): Promise<{ data: Blob | null; error: Error | null }>;
        list(path?: string, options?: { limit?: number; offset?: number; sortBy?: { column?: string; order?: string } }): Promise<{ data: { name: string; id: string; updated_at: string; created_at: string; last_accessed_at: string; metadata: Record<string, unknown> }[] | null; error: Error | null }>;
        getPublicUrl(path: string): { data: { publicUrl: string } };
        createSignedUrl(path: string, expiresIn: number): Promise<{ data: { signedUrl: string } | null; error: Error | null }>;
        remove(paths: string[]): Promise<{ data: { message: string }[] | null; error: Error | null }>;
        move(fromPath: string, toPath: string): Promise<{ data: { message: string } | null; error: Error | null }>;
        copy(fromPath: string, toPath: string): Promise<{ data: { message: string } | null; error: Error | null }>;
      };
      createBucket(id: string, options?: { public?: boolean; fileSizeLimit?: number; allowedMimeTypes?: string[] }): Promise<{ data: { name: string } | null; error: Error | null }>;
      getBucket(id: string): Promise<{ data: { id: string; name: string; owner: string; public: boolean; created_at: string; updated_at: string; file_size_limit?: number; allowed_mime_types?: string[] } | null; error: Error | null }>;
      listBuckets(): Promise<{ data: { id: string; name: string; owner: string; public: boolean; created_at: string; updated_at: string; file_size_limit?: number; allowed_mime_types?: string[] }[] | null; error: Error | null }>;
      deleteBucket(id: string): Promise<{ data: { message: string } | null; error: Error | null }>;
      emptyBucket(id: string): Promise<{ data: { message: string } | null; error: Error | null }>;
    };
    channel(topic: string): RealtimeChannel;
    removeChannel(channel: RealtimeChannel): Promise<void>;
    getChannels(): RealtimeChannel[];
    realtime: {
      subscribe(channel: string, config?: { broadcast?: { ack?: boolean; self?: boolean }; presence?: { key?: string } }): RealtimeChannel;
    };
    schema(schema: string): SupabaseClient;
  }

  export function createClient<T = any, SchemaName = any>(
    supabaseUrl: string,
    supabaseKey: string,
    options?: SupabaseClientOptions<SchemaName>
  ): SupabaseClient<T, SchemaName>;
}
