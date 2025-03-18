import { EventsEntity } from '../../../database/entities/events.entity';
import { EventModuleResDto } from '../dto/res/eventModuleRes.dto';
import { AncestorMaper } from '../../ancestors/mappers/ancestor.maper';

export class EventMapper {
  public static eventToRes(entity: EventsEntity): EventModuleResDto {
    const { id, date, place, type } = entity;
    return {
      id,
      date,
      type,
      place,
      persons: this.personsToEvent(entity),
    };
  }

  private static personsToEvent(entity: EventsEntity) {
    if (entity.type === 'MARR') {
      return entity.family[0].parents.map((parent) =>
        AncestorMaper.singlePersonMapper(parent),
      );
    }
    return entity.persons.map((person) =>
      AncestorMaper.singlePersonMapper(person),
    );
  }
}
