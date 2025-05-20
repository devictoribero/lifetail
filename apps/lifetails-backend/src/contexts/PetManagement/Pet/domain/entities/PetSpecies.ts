import { UnsupportedPetSpeciesException } from 'src/contexts/PetManagement/Pet/domain/exceptions/UnsupportedPetSpeciesException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

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
    const species = Species.types.find((species) => species.equals(petSpecies));

    if (!species) {
      throw new UnsupportedPetSpeciesException(new StringValueObject(value));
    }

    return species;
  }

  public static readonly DOG = new Species('DOG');
  public static readonly CAT = new Species('CAT');
  public static readonly types = [Species.DOG, Species.CAT];
}
