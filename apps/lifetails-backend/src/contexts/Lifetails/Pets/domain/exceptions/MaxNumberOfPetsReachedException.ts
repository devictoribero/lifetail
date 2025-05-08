export class MaxNumberOfPetsReachedException extends Error {
  constructor() {
    super(`Max number of pets reached`);
    this.name = 'MaxNumberOfPetsReachedException';
  }
}
