import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { AddArrivalLifeMomentOnPetAdded } from './AddArrivalLifeMomentOnPetAdded';
import { AddLifeMomentCommand } from '../add/AddLifeMomentCommand';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { AddLifeMomentCommandHandler } from '../add/AddLifeMomentCommandHandler';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { faker } from '@faker-js/faker';

describe('AddArrivalLifeMomentOnPetAdded', () => {
  let eventListener: AddArrivalLifeMomentOnPetAdded;
  let commandHandler: AddLifeMomentCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddArrivalLifeMomentOnPetAdded,
        {
          provide: AddLifeMomentCommandHandler,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    eventListener = module.get<AddArrivalLifeMomentOnPetAdded>(AddArrivalLifeMomentOnPetAdded);
    commandHandler = module.get<AddLifeMomentCommandHandler>(AddLifeMomentCommandHandler);

    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an Arrival life moment when pet is added', async () => {
    // Arrange
    const aggregateId = UUID.create().toString();
    const eventId = UUID.create().toString();
    const petName = faker.person.firstName();
    const eventDate = new Date();
    const event = {
      aggregateId,
      eventId,
      occurredOn: eventDate,
      attributes: { name: petName },
    };

    // Act
    await eventListener.handle(event);

    // Assert
    expect(commandHandler.handle).toHaveBeenCalledTimes(1);
    const command = (commandHandler.handle as jest.Mock).mock.calls[0][0];
    expect(command).toBeInstanceOf(AddLifeMomentCommand);
    expect(command.type).toBe(LifeMomentType.Arrival.toString());
    expect(command.petId).toBe(aggregateId);
    expect(command.createdBy).toBe(aggregateId);
    expect(command.occurredOn).toBe(eventDate);
    expect(command.description).toBe(`${petName} has arrived!`);
  });
});
