import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import { ConfigService } from '@nestjs/config';
import { CreateAccountUseCase } from 'src/contexts/Authentication/application/createAccount/CreateAccountUseCase';
import { CreateUserUseCase } from 'src/contexts/Users/application/createUser/CreateUserUseCase';
import { CreateUserCommand } from 'src/contexts/Users/application/createUser/CreateUserCommand';
import { GetUserCommand } from 'src/contexts/Users/application/getUser/GetUserCommand';
import { GetUserUseCase } from 'src/contexts/Users/application/getUser/GetUserUseCase';
import { faker } from '@faker-js/faker';
import { AddPetUseCase } from 'src/contexts/Pets/application/add/AddPetUseCase';
import { AddPetCommand } from 'src/contexts/Pets/application/add/AddPetCommand';
import { SearchAllPetsUseCase } from 'src/contexts/Pets/application/searchAll/SearchAllPetsUseCase';
import { SearchAllPetsQuery } from 'src/contexts/Pets/application/searchAll/SearchAllPetsQuery';

const logDomainEvent = (eventName: string) => {
  console.log(`[Domain Event] ${eventName}`);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port).then(async () => {
    console.info(`LifeTail API is running on port ${port}`);

    // execute createAccountUseCase
    const createAccountUseCase = app.get(CreateAccountUseCase);
    const account = await createAccountUseCase.execute({
      email: 'victor@test.com',
      password: 'test',
    });
    logDomainEvent('Account created');
    console.log(account);
    const createUserUseCase = app.get(CreateUserUseCase);

    const userUuid = faker.string.uuid();
    await createUserUseCase.execute(
      new CreateUserCommand(
        userUuid,
        account.getId().toString(),
        'Victor',
        'devictoribero',
        'Male',
        new Date('1990-01-01'),
      ),
    );

    const getUserUseCase = app.get(GetUserUseCase);
    const userFound = await getUserUseCase.execute(new GetUserCommand(account.getId().toString()));
    logDomainEvent('User created');
    console.log(userFound);

    const nekoUuid = faker.string.uuid();
    const createPetUseCase = app.get(AddPetUseCase);
    await createPetUseCase.execute(
      new AddPetCommand(
        nekoUuid,
        'Neko',
        'Male',
        `chip-id-${faker.string.alphanumeric(9)}`,
        true,
        new Date('2020-01-01'),
        userFound.getId().toString(),
      ),
    );
    logDomainEvent('Pet created');

    const searchAllPetsUseCase = app.get(SearchAllPetsUseCase);
    const queryGetUserPets = new SearchAllPetsQuery(userFound.getId().toString());
    await searchAllPetsUseCase.execute(queryGetUserPets);

    const tofuUuid = faker.string.uuid();
    await createPetUseCase.execute(
      new AddPetCommand(
        tofuUuid,
        'Tofu',
        'Male',
        `chip-id-${faker.string.alphanumeric(9)}`,
        true,
        new Date('2020-10-01'),
        userFound.getId().toString(),
      ),
    );
    logDomainEvent('Pet created');

    const allPets = await searchAllPetsUseCase.execute(queryGetUserPets);
    console.log('All pets --- ');
    console.log(allPets);
  });
}
bootstrap();
