export interface CommandHandler<T, R = void> {
  handle(command: T): Promise<R>;
}
