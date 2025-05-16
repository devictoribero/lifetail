# Todo

## High Priority

- Update module directories to be singular
- Review the error handling and follow best practices
  - Error handling in graphql apis work differently than in rest APIs.
  - I need to return anyhow the code, the error, reason, message, etc. as part of the response.
- Setup Postgresql locally with Prisma
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
  - color ?
  - pattern ?????
  - distinctions (campo abierto para escribir)
- Run Lifetails using postgres DB in DEVELOPMENT

## Medium Priority

- Add images capability
- Add weight records for of the pet
- Hard delete accounts and related data after 30d of being deleted
- A user can log out
