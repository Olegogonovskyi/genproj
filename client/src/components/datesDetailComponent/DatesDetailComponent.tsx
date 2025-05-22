import React, { FC } from 'react';
import { IDateModel } from '../../models/iDateModel';

const DatesDetailComponent: FC<{entity: IDateModel}> = ({entity}) => {
  const {id, year, description} = entity

  return (
    <div>
      <h3>{id}</h3>
<h1>{year}</h1> ------ <h1>{description}</h1>
    </div>
  );
};

export default DatesDetailComponent;