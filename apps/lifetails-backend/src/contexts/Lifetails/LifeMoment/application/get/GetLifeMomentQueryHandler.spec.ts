import { LifeMomentInMemoryRepository } from '../../infrastructure/LifeMomentInMemoryRepository';
import { GetLifeMomentQueryHandler } from './GetLifeMomentQueryHandler';
import { GetLifeMomentQuery } from './GetLifeMomentQuery';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMomentObjectMother } from '../../domain/entities/LifeMomentObjectMother.spec';

describe('GetLifeMomentQueryHandler', () => {
  let repository: LifeMomentInMemoryRepository;
  let queryHandler: GetLifeMomentQueryHandler;

  beforeEach(() => {
    repository = new LifeMomentInMemoryRepository();
    queryHandler = new GetLifeMomentQueryHandler(repository as unknown as LifeMomentRepository);
  });

  it('should throw LifeMomentNotFoundException when life moment does not exist', async () => {
    // Arrange
    repository.find = jest.fn().mockResolvedValue(null);
    const query = new GetLifeMomentQuery(UUID.generate().toString());

    // Act & Assert
    await expect(queryHandler.handle(query)).rejects.toThrow(new LifeMomentNotFoundException());
  });

  it('should get a life moment', async () => {
    // Arrange
    const lifeMoment = LifeMomentObjectMother.create();
    repository.find = jest.fn().mockResolvedValue(lifeMoment);
    const lifeMomentIdToFind = lifeMoment.getId().toString();
    const query = new GetLifeMomentQuery(lifeMomentIdToFind);
    const findSpy = jest.spyOn(repository, 'find');

    // Act
    const foundMoment = await queryHandler.handle(query);

    // Assert
    expect(findSpy).toHaveBeenCalledWith(lifeMoment.getId());
    expect(foundMoment).toBe(lifeMoment);
  });
});
