# Todo

## High Priority

- Create repository mocks for unit tests
- Review all tests:
  - On query/command handlers use inmemory repos

## Medium Priority

- Add current weight to pet.
  - Create LifeMoment type="weight_meaured" or similar after current weight is updated.
- Review all the tests
- Add Vaccination
  - private id: UUID;
  - private petId: UUID;
  - private vaccineName: StringValueObject;
  - private administeredOn: DateValueObject;
  - private expiresOn: DateValueObject;
  - private administeredBy: StringValueObject;
  - private lotNumber: StringValueObject | null;
  - private notes: StringValueObject | null;
  - private documentId: UUID | null; // Reference to uploaded proof
  - private createdAt: DateValueObject;
  - private updatedAt: DateValueObject | null;
- Add more info to the pet information
  - pattern ?????
  - distinctions (campo abierto para escribir)
- Add images capability
- Add weight records for of the pet

## Low priority

- Hard delete accounts and related data after 30d of being deleted
- A user can log out
