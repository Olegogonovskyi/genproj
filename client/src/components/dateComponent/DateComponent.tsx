import React, { FC } from 'react';
import { IDateModel } from '../../models/iDateModel';

const DateComponent: FC<{oneDate: IDateModel}> = ({oneDate}) => {
  const {id, year, description} = oneDate
  return (
    <div>
      <h3>{id}: {year} - {description}</h3>
    </div>
  );
};

export default DateComponent;