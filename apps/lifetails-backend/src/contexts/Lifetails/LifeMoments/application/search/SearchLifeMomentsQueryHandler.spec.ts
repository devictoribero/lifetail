import { SearchLifeMomentsQueryHandler } from './SearchLifeMomentsQueryHandler';
import { SearchLifeMomentsQuery } from './SearchLifeMomentsQuery';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { LifeMomentTheme } from '../../domain/entities/LifeMomentTheme';

describe('SearchLifeMomentsQueryHandler', () => {
  let handler: SearchLifeMomentsQueryHandler;
  let repository: jest.Mocked<LifeMomentRepository>;
  let petId: UUID;
  let FIXTURE_LIFE_MOMENTS: LifeMoment[];

  beforeEach(() => {
    repository = {
      search: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    petId = UUID.generate();
    const createdBy = UUID.generate();
    const lifeMomentId1 = UUID.generate();
    const lifeMomentId2 = UUID.generate();
    const lifeMoment1 = new LifeMoment({
      id: lifeMomentId1,
      type: LifeMomentType.fromPrimitives('Arrival'),
      theme: LifeMomentTheme.fromPrimitives('Celebration'),
      petId,
      createdBy,
      occurredOn: new DateValueObject(new Date('2023-01-01')),
      description: new StringValueObject('First vaccination'),
      createdAt: new DateValueObject(new Date('2023-01-01')),
    });

    const lifeMoment2 = new LifeMoment({
      id: lifeMomentId2,
      type: LifeMomentType.fromPrimitives('Walk'),
      theme: LifeMomentTheme.fromPrimitives('Activity'),
      petId,
      createdBy,
      occurredOn: new DateValueObject(new Date('2023-02-01')),
      description: new StringValueObject('Regular check-up'),
      createdAt: new DateValueObject(new Date('2023-01-01')),
      updatedAt: new DateValueObject(new Date('2023-01-01')),
    });

    FIXTURE_LIFE_MOMENTS = [lifeMoment1, lifeMoment2];

    handler = new SearchLifeMomentsQueryHandler(repository);
  });

  it('should return empty array when no life moments found', async () => {
    // Arrange
    repository.search.mockResolvedValue([]);

    // Act
    const query = new SearchLifeMomentsQuery(petId.toString());
    const result = await handler.handle(query);

    // Assert
    expect(repository.search).toHaveBeenCalledWith(petId);
    expect(result).toEqual([]);
  });

  it('should search life moments by pet id', async () => {
    // Arrange
    repository.search.mockResolvedValue(FIXTURE_LIFE_MOMENTS);

    // Act
    const query = new SearchLifeMomentsQuery(petId.toString());
    const result = await handler.handle(query);

    // Assert
    expect(repository.search).toHaveBeenCalledWith(petId);
    expect(result).toHaveLength(2);
    expect(result).toEqual(FIXTURE_LIFE_MOMENTS);
  });
});
