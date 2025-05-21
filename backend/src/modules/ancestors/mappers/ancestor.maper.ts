import { EventsEntity } from 'src/database/entities/events.entity';
import { PersonEntity } from 'src/database/entities/person.entity';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { SinglePersonResDto } from '../dto/res/singlePerson.res.dto';
import { PersonResDto } from '../dto/res/person.res.dto';
import { FamilyResDto } from '../dto/res/family.res.dto';
import { EventResDto } from '../dto/res/event.res.dto';

export class AncestorMaper {
  public static transformPersonEntity(person: PersonEntity): PersonResDto {
    return {
      id: person.id,
      insideId: person.insideId,
      name: person.name || '',
      surName: person.surName || '',
      marriedSurName: person.marriedSurName || '',
      sex: person.sex,
      isDead: person.isDead || false,
      npfx: person.npfx || '',
      note: person.note || '',
      object: person.object || '',
      familyAsParent: this.transformFamilyPerson(person.familyAsParent),
      familyAsChild: this.transformFamilyPerson(person.familyAsChild),
      birthDateandPlace: AncestorMaper.getEventByType(person.events, 'BIRT'),
      deathDateandPlace: AncestorMaper.getEventByType(person.events, 'DEAT'),
    };
  }

  public static transformNestedPerson(
    person: PersonEntity,
  ): SinglePersonResDto {
    return {
      id: person.id,
      insideId: person.insideId,
      name: person.name || '',
      marriedSurName: person.marriedSurName || '',
      surName: person.surName || '',
      birthDateandPlace: AncestorMaper.getEventByType(person.events, 'BIRT'),
      deathDateandPlace: AncestorMaper.getEventByType(person.events, 'DEAT'),
    };
  }

  public static transformFamilyPerson(
    personFamily: FamilyEntity[],
  ): FamilyResDto[] {
    return personFamily.map((family) => this.transformOneFam(family));
  }

  public static transformOneFam(family: FamilyEntity) {
    return {
      id: family.id,
      insideId: family.insideId,
      parents:
        family.parents?.map((parent) =>
          AncestorMaper.transformNestedPerson(parent),
        ) || [],
      children:
        family.children?.map((child) =>
          AncestorMaper.transformNestedPerson(child),
        ) || [],
      dateOfMarry: AncestorMaper.getEventByType(family.events, 'MARR'),
    };
  }

  private static getEventByType(
    events: EventsEntity[] | undefined,
    type: string,
  ): EventResDto | null {
    const event = events?.find((e) => e.type === type);
    if (!event) return undefined;

    return { date: event.date || '', place: event.place || '' };
  }
}
