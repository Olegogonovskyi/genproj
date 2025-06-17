import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
// import DateComponent from '../dateComponent/DateComponent';
import TimelineComponent from '../timelineComponent/TimelineComponent';

const AllDatesComponent: FC = () => {
  const {data} = useAppSelector(state => state.datesReducer)
  return (
    <div>
      {
        data && data.map(oneDate => <TimelineComponent key={oneDate.id} oneDate={oneDate} />)

      }
    </div>
  );
};

export default AllDatesComponent;