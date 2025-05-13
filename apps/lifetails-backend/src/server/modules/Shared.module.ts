import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EVENT_BUS } from 'src/contexts/Shared/domain/EventBus';
import { NestEventBus } from 'src/contexts/Shared/infrastructure/EventBus/NestEventBus';

const EventBusProvider = {
  provide: EVENT_BUS,
  useClass: NestEventBus,
};

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to true to use wildcards
      wildcard: true,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to true if you want to emit the newListener event
      newListener: true,
      // set this to true if you want to emit the removeListener event
      removeListener: true,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: true,
    }),
  ],
  providers: [EventBusProvider],
  exports: [EventBusProvider],
})
export class SharedModule {}
