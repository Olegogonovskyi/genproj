import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import DateComponent from '../dateComponent/DateComponent';

const AllDatesComponent: FC = () => {
  const {data} = useAppSelector(state => state.datesReducer)
  return (
    <div>
      {
        data && data.map(oneDate => <DateComponent key={oneDate.id} oneDate={oneDate} />)

      }
    </div>
  );
};

export default AllDatesComponent;