export interface QueryHandler<T, R> {
  handle(query: T): Promise<R>;
}
