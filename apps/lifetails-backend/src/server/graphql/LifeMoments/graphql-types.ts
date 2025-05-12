import { registerEnumType } from '@nestjs/graphql';

export enum LifeMomentThemeGraphqlEnum {
  Activity = 'Activity',
  Celebration = 'Celebration',
  DeliciousMoments = 'DeliciousMoments',
  Farewell = 'Farewell',
  GroomingAndCare = 'GroomingAndCare',
  Memories = 'Memories',
  Wellness = 'Wellness',
}

export enum LifeMomentTypeGraphqlEnum {
  Achievement = 'Achievement',
  Anniversary = 'Anniversary',
  Arrival = 'Arrival',
  Bath = 'Bath',
  Death = 'Death',
  DietChange = 'DietChange',
  Discomfort = 'Discomfort',
  Excursion = 'Excursion',
  Exercise = 'Exercise',
  Gift = 'Gift',
  Goodbye = 'Goodbye',
  GroomingVisit = 'GroomingVisit',
  Hydration = 'Hydration',
  Illness = 'Illness',
  Injury = 'Injury',
  Medication = 'Medication',
  Move = 'Move',
  NailCut = 'NailCut',
  Play = 'Play',
  Socialization = 'Socialization',
  SpecialMeal = 'SpecialMeal',
  Surgery = 'Surgery',
  Training = 'Training',
  Vaccination = 'Vaccination',
  VeterinaryVisit = 'VeterinaryVisit',
  Walk = 'Walk',
}

// Register the enums for GraphQL
registerEnumType(LifeMomentThemeGraphqlEnum, {
  name: 'LifeMomentTheme',
});

registerEnumType(LifeMomentTypeGraphqlEnum, {
  name: 'LifeMomentType',
});
