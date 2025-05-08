import { InvalidPetSpeciesException } from 'src/contexts/Lifetails/Pets/domain/exceptions/InvalidSpeciesException';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';

export class Species extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  // Use to create the entity from the domain
  public static create(value: string): Species {
    return new Species(value);
  }

  // Use to reconstruct the entity from the database
  public static fromPrimitives(value: string): Species {
    const petSpecies = new Species(value);
    const species = Species.All.find((species) => species.equals(petSpecies));

    if (!species) {
      throw new InvalidPetSpeciesException(value);
    }

    return species;
  }

  public static readonly Dog = new Species('Dog');
  public static readonly Cat = new Species('Cat');
  public static readonly All = [Species.Dog, Species.Cat];
}
