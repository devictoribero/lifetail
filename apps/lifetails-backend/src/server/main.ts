import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import { ConfigService } from '@nestjs/config';
import { CreateAccountUseCase } from 'src/contexts/Authentication/application/createAccount/CreateAccountUseCase';
import { CreateUserUseCase } from 'src/contexts/Users/application/createUser/CreateUserUseCase';
import { CreateUserCommand } from 'src/contexts/Users/application/createUser/CreateUserCommand';
import { GetUserQuery } from 'src/contexts/Users/application/getUser/GetUserQuery';
import { GetUserUseCase } from 'src/contexts/Users/application/getUser/GetUserUseCase';
import { faker } from '@faker-js/faker';
import { AddPetUseCase } from 'src/contexts/Pets/application/add/AddPetUseCase';
import { AddPetCommand } from 'src/contexts/Pets/application/add/AddPetCommand';
import { SearchAllPetsUseCase } from 'src/contexts/Pets/application/searchAll/SearchAllPetsUseCase';
import { SearchAllPetsQuery } from 'src/contexts/Pets/application/searchAll/SearchAllPetsQuery';
import { RemovePetCommand } from 'src/contexts/Pets/application/remove/RemovePetCommand';
import { RemovePetUseCase } from 'src/contexts/Pets/application/remove/RemovePetUseCase';
import { UpdatePetUseCase } from 'src/contexts/Pets/application/update/UpdatePetUseCase';
import { UpdatePetCommand } from 'src/contexts/Pets/application/update/UpdatePetCommand';
import { FindPetUseCase } from 'src/contexts/Pets/application/find/FindPetUseCase';
import { FindPetQuery } from 'src/contexts/Pets/application/find/FindPetQuery';

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
    const createAccountUseCase = app.get(CreateAccountUseCase);
    const account = await createAccountUseCase.execute({
      email: 'victor@test.com',
      password: 'test',
    });
    logDomainEvent('Account created', account);

    // Create user for account
    const accountId = account.getId().toString();
    const userUuid = faker.string.uuid();
    const createUserUseCase = app.get(CreateUserUseCase);
    await createUserUseCase.execute(
      new CreateUserCommand(
        userUuid,
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

    // Create pet (Neko)
    const nekoUuid = faker.string.uuid();
    const nekoChipId = `chip-id-${faker.string.alphanumeric(9)}`;
    const createPetUseCase = app.get(AddPetUseCase);
    await createPetUseCase.execute(
      new AddPetCommand(
        nekoUuid,
        'Neko',
        'Male',
        nekoChipId,
        true,
        new Date('2020-01-01'),
        userUuid,
      ),
    );
    const findPetUseCase = app.get(FindPetUseCase);
    const neko = await findPetUseCase.execute(new FindPetQuery(nekoUuid));
    logDomainEvent('Pet created', neko);

    // Search all pets
    const searchAllPetsUseCase = app.get(SearchAllPetsUseCase);
    const queryGetUserPets = new SearchAllPetsQuery(userUuid);
    await searchAllPetsUseCase.execute(queryGetUserPets);

    // Create pet (Tofu)
    const tofuUuid = faker.string.uuid();
    const tofuChipId = `chip-id-${faker.string.alphanumeric(9)}`;
    await createPetUseCase.execute(
      new AddPetCommand(
        tofuUuid,
        'Tofu',
        'Male',
        tofuChipId,
        true,
        new Date('2020-10-01'),
        userUuid,
      ),
    );
    const tofu = await findPetUseCase.execute(new FindPetQuery(tofuUuid));
    logDomainEvent('Pet created', tofu);

    // Search all pets
    const allPets = await searchAllPetsUseCase.execute(queryGetUserPets);
    console.log('ALL PETS');
    console.log(allPets);

    // Remove pet
    const removePetUseCase = app.get(RemovePetUseCase);
    await removePetUseCase.execute(new RemovePetCommand(tofuUuid));
    logDomainEvent('Pet removed', tofu);

    const allPetsAfterRemoval = await searchAllPetsUseCase.execute(queryGetUserPets);
    console.log('All pets after removal --- ');
    console.log(allPetsAfterRemoval);

    const updatePetUseCase = app.get(UpdatePetUseCase);
    await updatePetUseCase.execute(
      new UpdatePetCommand(
        nekoUuid,
        'Neko',
        'Male',
        `chip-id-${faker.string.alphanumeric(9)}`,
        true,
        new Date('2020-01-01'),
      ),
    );
    logDomainEvent('Pet updated', { id: nekoUuid });
    const allPetsAfterUpdate = await searchAllPetsUseCase.execute(new SearchAllPetsQuery(userUuid));
    console.log('All pets after update --- ');
    console.log(allPetsAfterUpdate);
  });
}

bootstrap();
