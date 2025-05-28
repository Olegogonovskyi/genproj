import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';
import AllDatesComponent from '../allDatesComponent/AllDatesComponent';

const AncestorDetailComponent: FC<{entity: IAncestorModel}> = ({entity}) => {

  const {id, name, surName, sex, note, deathDateandPlace, birthDateandPlace } = entity
  return (
    <div>
      <h1>{id}: {name} {surName}</h1>
      <h4> birth: {birthDateandPlace.date}</h4>
      <h4> death: {deathDateandPlace.date}</h4>
      <h3>{sex}</h3>
      <p>{note}</p>
      <hr/>
      <AllDatesComponent/>

    </div>
  );
};

export default AncestorDetailComponent;