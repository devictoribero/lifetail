export class LifeMomentNotFoundException extends Error {
  constructor(id: string) {
    super(`Life moment not found: ${id}`);
    this.name = 'LifeMomentNotFoundException';
  }
}
