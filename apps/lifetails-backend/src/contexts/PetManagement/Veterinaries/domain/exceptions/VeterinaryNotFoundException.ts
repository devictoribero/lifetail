export class VeterinaryNotFoundException extends Error {
  constructor(id: string) {
    super(`Veterinary not found: ${id}`);
    this.name = 'VeterinaryNotFoundException';
  }
}
