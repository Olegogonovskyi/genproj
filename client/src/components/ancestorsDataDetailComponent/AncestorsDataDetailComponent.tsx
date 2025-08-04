import React, {FC} from 'react';
import { IAncestorDateModel } from '../../models/IAncestorDateModel';

const AncestorsDataDetailComponent: FC<{entity: IAncestorDateModel}> = ({entity}) => {

  const {type, place, familyPersons, personEvent, date} = entity
  return (
    <div>
      <h1>
        {date} {type} - {place} -
        {personEvent?.[0]?.name ?? ''} {personEvent?.[0]?.surName ?? ''}
      </h1>

      {familyPersons?.[0]?.parents?.map((parent) => (
        <h1 key={parent.id}>
          {parent.id}: {parent.name} {parent.surName} {parent.marriedSurName}
        </h1>
      ))}
    </div>
  );
};

export default AncestorsDataDetailComponent;