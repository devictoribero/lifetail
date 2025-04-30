export class PetLifeMomentNotFoundException extends Error {
  constructor(id: string) {
    super(`Pet life moment not found: ${id}`);
    this.name = 'PetLifeMomentNotFoundException';
  }
}
