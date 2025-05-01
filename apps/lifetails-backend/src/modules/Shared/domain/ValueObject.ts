export class ValueObject<T> {
  protected value: T;

  public constructor(value: T) {
    this.value = value;
  }
}
