import { PersonEntity } from '../../../database/entities/person.entity';
import { SinglePersonResDto } from '../dto/res/singlePerson.res.dto';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { FamilyResDto } from '../dto/res/family.res.dto';
import { PersonResDto } from '../dto/res/person.res.dto';
import { EventsEntity } from '../../../database/entities/events.entity';
import { EventResDto } from '../dto/res/event.res.dto';

export class AncestorMaper {
  public static singlePersonMapper(
    singlePerson: PersonEntity,
  ): SinglePersonResDto {
    const { id, insideId, name, surName, marriedSurName } = singlePerson;
    return { id, insideId, name, surName, marriedSurName };
  }

  public static familyMapper(family: FamilyEntity): FamilyResDto {
    const { id, insideId, parents, children, events } = family;
    return {
      id,
      insideId,
      parents: parents?.map((parent) => this.singlePersonMapper(parent)),
      children: children?.map((child) => this.singlePersonMapper(child)),
      dateOfMarry: events.length ? this.eventMapper(events, 'MARR') : undefined,
    };
  }

  public static eventMapper(
    eventsEntity: EventsEntity[] | undefined, // Дозволяємо undefined
    typeOfEvent: string,
  ): EventResDto | undefined {
    if (!eventsEntity) {
      // Перевірка на наявність масиву
      return undefined;
    }
    const event = eventsEntity
      .filter((event) => event.type === typeOfEvent)
      .map(
        (event): EventResDto => ({ date: event.date, place: event.place }),
      )[0]; // Беремо перший елемент
    return event;
  }

  public static personMapper(personEntity: PersonEntity): PersonResDto {
    const {
      id,
      insideId,
      name,
      surName,
      marriedSurName,
      sex,
      isDead,
      npfx,
      note,
      object,
      familyAsParent,
      familyAsChild,
      events,
    } = personEntity;
    return {
      id,
      insideId,
      npfx,
      name,
      surName,
      marriedSurName,
      sex,
      isDead,
      note,
      object,
      familyAsParent: familyAsParent?.map((family) =>
        this.familyMapper(family),
      ),
      familyAsChild: familyAsChild?.map((family) => this.familyMapper(family)),
      birthDateandPlace: this.eventMapper(events, 'BIRT') || undefined,
      deathDateandPlace: this.eventMapper(events, 'DEAT') || undefined,
    };
  }
}
