import { faker } from '@faker-js/faker';
import { AddPetCommandHandler } from 'src/contexts/PetManagement/Pets/application/add/AddPetCommandHandler';
import { GetPetQueryHandler } from 'src/contexts/PetManagement/Pets/application/get/GetPetQueryHandler';
import { GetPetQuery } from 'src/contexts/PetManagement/Pets/application/get/GetPetQuery';
import { AddLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/add/AddLifeMomentCommandHandler';
import { Species } from 'src/contexts/PetManagement/Pets/domain/entities/PetSpecies';
import { AddPetCommand } from 'src/contexts/PetManagement/Pets/application/add/AddPetCommand';
import { INestApplication, Logger } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Identity/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { GetUserQuery } from 'src/contexts/Identity/Users/application/getUser/GetUserQuery';
import { GetUserQueryHandler } from 'src/contexts/Identity/Users/application/getUser/GetUserQueryHandler';
import { AuthenticateAccountCommand } from 'src/contexts/Identity/Authentication/application/authenticateAccount/AuthenticateAccountCommand';
import { CreateUserCommand } from 'src/contexts/Identity/Users/application/createUser/CreateUserCommand';
import { CreateUserCommandHandler } from 'src/contexts/Identity/Users/application/createUser/CreateUserCommandHandler';
import { CreateAccountCommandHandler } from 'src/contexts/Identity/Accounts/application/createAccount/CreateAccountCommandHandler';
import { AddVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/AddVeterinary/AddVeterinaryCommandHandler';
import { AddVeterinaryCommand } from 'src/contexts/PetManagement/Veterinaries/application/AddVeterinary/AddVeterinaryCommand';
import { GetVeterinaryQueryHandler } from 'src/contexts/PetManagement/Veterinaries/application/GetVeterinary/GetVeterinaryQueryHandler';
import { GetVeterinaryQuery } from 'src/contexts/PetManagement/Veterinaries/application/GetVeterinary/GetVeterinaryQuery';

const logger = new Logger('seed-db');

const logDomainEvent = (eventName: string, data?: any) => {
  logger.debug(`[Domain Event] ${eventName}`, data);
};

const USER_ID = '6e3bf192-2d53-452e-a713-157c7975e5ba';
const CREDENTIALS = {
  email: 'victor.ribero3@gmail.com',
  password: 'password123',
  nickname: 'Victor',
};
const LIFE_MOMENTS_COUNT = 0;

const getCommandHandlers = (app: INestApplication) => {
  const authenticateAccountCommandHandler = app.get(AuthenticateAccountCommandHandler);
  const getUserQueryHandler = app.get(GetUserQueryHandler);
  const addPetCommandHandler = app.get(AddPetCommandHandler);
  const getPetQueryHandler = app.get(GetPetQueryHandler);
  const addLifeMomentCommandHandler = app.get(AddLifeMomentCommandHandler);
  const addVeterinaryCommandHandler = app.get(AddVeterinaryCommandHandler);
  const getVeterinaryQueryHandler = app.get(GetVeterinaryQueryHandler);

  return {
    authenticateAccountCommandHandler,
    getUserQueryHandler,
    addPetCommandHandler,
    getPetQueryHandler,
    addLifeMomentCommandHandler,
    addVeterinaryCommandHandler,
    getVeterinaryQueryHandler,
  };
};

const createAccountAndUser = async (
  app: INestApplication,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
): Promise<{ id: string }> => {
  const createAccountCommandHandler = app.get(CreateAccountCommandHandler);
  const createUserCommandHandler = app.get(CreateUserCommandHandler);

  const account = await createAccountCommandHandler.handle({
    id: UUID.generate().toString(),
    email: CREDENTIALS.email,
    password: CREDENTIALS.password,
  });
  const accountId = account.id;
  logDomainEvent('Account created', account);

  const createUserCommand = new CreateUserCommand(accountId, USER_ID, CREDENTIALS.nickname);
  await createUserCommandHandler.handle(createUserCommand);

  return { id: account.id };
};

export const seedDatabase = async (app: INestApplication) => {
  const {
    authenticateAccountCommandHandler,
    getUserQueryHandler,
    addPetCommandHandler,
    getPetQueryHandler,
    addLifeMomentCommandHandler,
    addVeterinaryCommandHandler,
    getVeterinaryQueryHandler,
  } = getCommandHandlers(app);

  ////////////////////////////////////////////////////////////////////////////////
  // Create account
  const account = await createAccountAndUser(app, CREDENTIALS);

  ////////////////////////////////////////////////////////////////////////////////
  // Create user for account
  const accountId = account.id;
  const USER_ID = '6e3bf192-2d53-452e-a713-157c7975e5ba';
  const getUserQuery = new GetUserQuery(accountId);
  const user = await getUserQueryHandler.handle(getUserQuery);

  const payload = { accountId, userId: user.getId().toString(), email: CREDENTIALS.email };

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1M2QzOTFlMS1lOWM4LTQwMGYtOWEzYi0xOWM4NTQ4NTZmZGUiLCJ1c2VySWQiOiI2ZTNiZjE5Mi0yZDUzLTQ1MmUtYTcxMy0xNTdjNzk3NWU1YmEiLCJlbWFpbCI6InZpY3Rvci5yaWJlcm8zQGdtYWlsLmNvbSIsImlhdCI6MTc0NzA4MjAyMywiZXhwIjoxNzQ3MTY4NDIzfQ.O42xfac2NxZw27HOe0fkedtS-7gPnSYcuHikxOFL06o';
  const refreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1M2QzOTFlMS1lOWM4LTQwMGYtOWEzYi0xOWM4NTQ4NTZmZGUiLCJ1c2VySWQiOiI2ZTNiZjE5Mi0yZDUzLTQ1MmUtYTcxMy0xNTdjNzk3NWU1YmEiLCJlbWFpbCI6InZpY3Rvci5yaWJlcm8zQGdtYWlsLmNvbSIsImlhdCI6MTc0NzA4MjAyMywiZXhwIjoxNzU0ODU4MDIzfQ.cdV55PCZurSn1ETQBjvkmIrUjgM1wTEj8xE3OsLzDUI';

  const authenticateAccountCommand = new AuthenticateAccountCommand(
    CREDENTIALS.email,
    CREDENTIALS.password,
  );
  await authenticateAccountCommandHandler.handle(authenticateAccountCommand);
  logDomainEvent('User authenticated', { userId: USER_ID, token });

  ////////////////////////////////////////////////////////////////////////////////
  // Add pet
  const petId = '550e8400-e29b-41d4-a716-446655440000';
  const addPetCommand = new AddPetCommand(
    petId,
    Species.Cat.toString(),
    'Neko',
    'Male',
    true,
    new Date('2020-01-01'),
    USER_ID,
  );
  await addPetCommandHandler.handle(addPetCommand);
  const pet = await getPetQueryHandler.handle(new GetPetQuery(petId));
  logDomainEvent('Pet added', pet);

  ////////////////////////////////////////////////////////////////////////////////
  // Add veterinaries
  const fontblancaVetId = '7c0dabfa-e6f8-41a4-adfd-c891f509d4d8';
  const addFontblancaVetCommand = new AddVeterinaryCommand(
    fontblancaVetId,
    'Fontblanca veterinary',
  );
  await addVeterinaryCommandHandler.handle(addFontblancaVetCommand);
  logDomainEvent('Veterinary added', { id: fontblancaVetId, name: 'Fontblanca veterinary' });

  const encampVetId = UUID.generate().toString();
  const addEncampVetCommand = new AddVeterinaryCommand(encampVetId, 'Veterinary Encamp');
  await addVeterinaryCommandHandler.handle(addEncampVetCommand);
  logDomainEvent('Veterinary added', { id: encampVetId, name: 'Veterinary Encamp' });

  // Add life moment for pet

  // Iterate 10 times to add 10 life moments
  // for (let i = 0; i < LIFE_MOMENTS_COUNT; i++) {
  //   const lifeMomentUuid = faker.string.uuid();
  //   const addLifeMomentCommand = new AddLifeMomentCommand(
  //     lifeMomentUuid,
  //     'Arrival',
  //     petId,
  //     USER_ID,
  //     new Date('2024-12-13'),
  //     'Nekito llega a casa!',
  //   );
  //   await addLifeMomentCommandHandler.handle(addLifeMomentCommand);
  //   logDomainEvent('Life moment added', { id: lifeMomentUuid });
  // }
};
