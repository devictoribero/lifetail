export class PetNotFoundException extends Error {
  constructor(id: string) {
    super(`Pet not found: ${id}`);
    this.name = 'PetNotFoundException';
  }
}
