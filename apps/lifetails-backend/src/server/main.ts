import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/App.module';
import { CreateUserCommand } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommand';
import { GetUserQuery } from 'src/contexts/Lifetails/Users/application/getUser/GetUserQuery';

import { faker } from '@faker-js/faker';
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { SearchAllPetsQuery } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQuery';
import { RemovePetCommand } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommand';
import { RemovePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommandHandler';
import { UpdatePetCommand } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommand';
import { FindPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/find/FindPetQueryHandler';
import { FindPetQuery } from 'src/contexts/Lifetails/Pets/application/find/FindPetQuery';
import { AddPetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommandHandler';
import { AddPetLifeMomentCommand } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommand';
import { Species } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { CreateUserCommandHandler } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommandHandler';
import { AddPetCommand } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommand';
import { GetUserQueryHandler } from 'src/contexts/Lifetails/Users/application/getUser/GetUserQueryHandler';
import { SearchAllPetsQueryHandler } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQueryHandler';

const logDomainEvent = (eventName: string, data?: any) => {
  console.log(`[Domain Event] ${eventName}`, data);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port).then(async () => {
    console.info(`LifeTail API is running on port ${port}`);

    ////////////////////////////////////////////////////////////////////////////////
    // Create account
    const createAccountCommandHandler = app.get(CreateAccountCommandHandler);
    const account = await createAccountCommandHandler.execute({
      email: 'victor@test.com',
      password: 'test',
    });
    logDomainEvent('Account created', account);

    ////////////////////////////////////////////////////////////////////////////////
    // Create user for account
    const accountId = account.id;
    const victorUuid = faker.string.uuid();
    const createUserCommandHandler = app.get(CreateUserCommandHandler);
    await createUserCommandHandler.execute(
      new CreateUserCommand(
        victorUuid,
        accountId,
        'Victor',
        'devictoribero',
        'Male',
        new Date('1990-01-01'),
      ),
    );

    ////////////////////////////////////////////////////////////////////////////////
    // Add pet (Neko)
    const getUserQueryHandler = app.get(GetUserQueryHandler);
    const userFound = await getUserQueryHandler.execute(new GetUserQuery(accountId));
    logDomainEvent('User created', userFound);

    const nekoUuid = faker.string.uuid();
    const addPetCommandHandler = app.get(AddPetCommandHandler);
    const addNekoCommand = new AddPetCommand(
      nekoUuid,
      Species.Cat.toString(),
      'Neko',
      'Male',
      true,
      new Date('2020-01-01'),
      victorUuid,
    );
    await addPetCommandHandler.execute(addNekoCommand);
    const findPetQueryHandler = app.get(FindPetQueryHandler);
    const neko = await findPetQueryHandler.execute(new FindPetQuery(nekoUuid));
    logDomainEvent('Pet added', neko);

    // Search all pets
    const searchAllPetsQueryHandler = app.get(SearchAllPetsQueryHandler);
    const queryGetUserPets = new SearchAllPetsQuery(victorUuid);
    await searchAllPetsQueryHandler.execute(queryGetUserPets);

    // Remove pet
    const removePetCommandHandler = app.get(RemovePetCommandHandler);
    await removePetCommandHandler.execute(new RemovePetCommand(nekoUuid));
    logDomainEvent('Pet removed', neko);

    // Add pet (Tofu)
    const tofuUuid = faker.string.uuid();
    const addTofuCommand = new AddPetCommand(
      tofuUuid,
      Species.Cat.toString(),
      'Tofu',
      'Male',
      true,
      new Date('2020-10-01'),
      victorUuid,
    );
    await addPetCommandHandler.execute(addTofuCommand);
    const tofu = await findPetQueryHandler.execute(new FindPetQuery(tofuUuid));
    logDomainEvent('Pet added', tofu);

    // Search all pets
    const allPets = await searchAllPetsQueryHandler.execute(queryGetUserPets);
    console.log('All pets of victor');
    console.log(allPets);

    const updatePetCommandHandler = app.get(UpdatePetCommandHandler);
    await updatePetCommandHandler.execute(
      new UpdatePetCommand(tofuUuid, 'Tofu', 'Female', 'new-chip-id', true, new Date('2020-01-01')),
    );
    logDomainEvent('Pet updated', { id: tofuUuid });

    const allPetsAfterUpdate = await searchAllPetsQueryHandler.execute(queryGetUserPets);
    console.log('All pets after update --- ');
    console.log(allPetsAfterUpdate);

    // Add pet life moment for neko
    const firstLifeMomentUuid = faker.string.uuid();
    const addPetLifeMomentCommandHandler = app.get(AddPetLifeMomentCommandHandler);
    const addFirstLifeMomentCommand = new AddPetLifeMomentCommand(
      firstLifeMomentUuid,
      'Arrival',
      nekoUuid,
      victorUuid,
      new Date('2024-12-13'),
      'Nekito llega a casa!',
    );
    await addPetLifeMomentCommandHandler.execute(addFirstLifeMomentCommand);
    logDomainEvent('Pet life moment added', { id: firstLifeMomentUuid });
  });
}

bootstrap();
