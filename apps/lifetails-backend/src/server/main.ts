import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/App.module';
import { CreateUserCommand } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommand';
import { GetUserQuery } from 'src/contexts/Lifetails/Users/application/getUser/GetUserQuery';
import { GetUserUseCase } from 'src/contexts/Lifetails/Users/application/getUser/GetUserUseCase';
import { faker } from '@faker-js/faker';
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { SearchAllPetsUseCase } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsUseCase';
import { SearchAllPetsQuery } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQuery';
import { RemovePetCommand } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommand';
import { RemovePetUseCase } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetUseCase';
import { UpdatePetUseCase } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetUseCase';
import { UpdatePetCommand } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommand';
import { FindPetUseCase } from 'src/contexts/Lifetails/Pets/application/find/FindPetUseCase';
import { FindPetQuery } from 'src/contexts/Lifetails/Pets/application/find/FindPetQuery';
import { AddPetLifeMomentUseCase } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommand';
import { Species } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { CreateUserUseCase } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserUseCase';
import { AddPetCommand } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommand';

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

    // Create account
    const createAccountCommandHandler = app.get(CreateAccountCommandHandler);
    const account = await createAccountCommandHandler.execute({
      email: 'victor@test.com',
      password: 'test',
    });
    logDomainEvent('Account created', account);

    // Create user for account
    const accountId = account.getId().toString();
    const victorUuid = faker.string.uuid();
    const createUserUseCase = app.get(CreateUserUseCase);
    await createUserUseCase.execute(
      new CreateUserCommand(
        victorUuid,
        accountId,
        'Victor',
        'devictoribero',
        'Male',
        new Date('1990-01-01'),
      ),
    );
    // Get user
    const getUserUseCase = app.get(GetUserUseCase);
    const userFound = await getUserUseCase.execute(new GetUserQuery(accountId));
    logDomainEvent('User created', userFound);

    // Add pet (Neko)
    const nekoUuid = faker.string.uuid();
    const nekoChipId = `chip-id-${faker.string.alphanumeric(9)}`;
    const addPetCommandHandler = app.get(AddPetCommandHandler);
    const addNekoCommand = new AddPetCommand(
      nekoUuid,
      Species.Cat.toString(),
      'Neko',
      'Male',
      nekoChipId,
      true,
      new Date('2020-01-01'),
      victorUuid,
    );
    await addPetCommandHandler.execute(addNekoCommand);
    const findPetUseCase = app.get(FindPetUseCase);
    const neko = await findPetUseCase.execute(new FindPetQuery(nekoUuid));
    logDomainEvent('Pet added', neko);

    // Search all pets
    const searchAllPetsUseCase = app.get(SearchAllPetsUseCase);
    const queryGetUserPets = new SearchAllPetsQuery(victorUuid);
    await searchAllPetsUseCase.execute(queryGetUserPets);

    // Remove pet
    const removePetUseCase = app.get(RemovePetUseCase);
    await removePetUseCase.execute(new RemovePetCommand(nekoUuid));
    logDomainEvent('Pet removed', neko);

    // Add pet (Tofu)
    const tofuUuid = faker.string.uuid();
    const tofuChipId = `chip-id-${faker.string.alphanumeric(9)}`;
    const addTofuCommand = new AddPetCommand(
      tofuUuid,
      Species.Cat.toString(),
      'Tofu',
      'Male',
      tofuChipId,
      true,
      new Date('2020-10-01'),
      victorUuid,
    );
    await addPetCommandHandler.execute(addTofuCommand);
    const tofu = await findPetUseCase.execute(new FindPetQuery(tofuUuid));
    logDomainEvent('Pet added', tofu);

    // Search all pets
    const allPets = await searchAllPetsUseCase.execute(queryGetUserPets);
    console.log('All pets of victor');
    console.log(allPets);

    const updatePetUseCase = app.get(UpdatePetUseCase);
    await updatePetUseCase.execute(
      new UpdatePetCommand(
        tofuUuid,
        'Tofu',
        'Female',
        `chip-id-${faker.string.alphanumeric(9)}`,
        true,
        new Date('2020-01-01'),
      ),
    );
    logDomainEvent('Pet updated', { id: tofuUuid });

    const allPetsAfterUpdate = await searchAllPetsUseCase.execute(
      new SearchAllPetsQuery(victorUuid),
    );
    console.log('All pets after update --- ');
    console.log(allPetsAfterUpdate);

    // Add pet life moment for neko
    const firstLifeMomentUuid = faker.string.uuid();
    const addPetLifeMomentUseCase = app.get(AddPetLifeMomentUseCase);
    const addFirstLifeMomentCommand = new AddPetLifeMomentCommand(
      firstLifeMomentUuid,
      'Arrival',
      nekoUuid,
      victorUuid,
      new Date('2024-12-13'),
      'Nekito llega a casa!',
    );
    await addPetLifeMomentUseCase.execute(addFirstLifeMomentCommand);
    logDomainEvent('Pet life moment added', { id: firstLifeMomentUuid });
  });
}

bootstrap();
