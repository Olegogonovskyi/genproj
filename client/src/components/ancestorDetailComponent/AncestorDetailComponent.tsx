import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';

const AncestorDetailComponent: FC<{entity: IAncestorModel}> = ({entity}) => {

  const {id, name, surName, sex, note } = entity
  return (
    <div>
      <h1>{id}: {name} {surName}</h1>
      <h3>{sex}</h3>
      <p>{note}</p>

    </div>
  );
};

export default AncestorDetailComponent;