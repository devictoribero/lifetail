import { SearchLifeMomentsQueryHandler } from './SearchLifeMomentsQueryHandler';
import { SearchLifeMomentsQuery } from './SearchLifeMomentsQuery';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { LifeMomentTheme } from '../../domain/entities/LifeMomentTheme';
import { LifeMomentObjectMother } from '../../domain/entities/LifeMomentObjectMother.spec';

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
    };

    const lifeMoment1 = LifeMomentObjectMother.create();
    const lifeMoment2 = LifeMomentObjectMother.create();
    petId = lifeMoment1.getPetId();

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
