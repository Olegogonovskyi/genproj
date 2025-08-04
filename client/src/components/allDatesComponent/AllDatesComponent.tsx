import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import TimelineComponent from '../timelineComponent/TimelineComponent';

const AllDatesComponent: FC<{ dashboard?: boolean }> = ({dashboard}) => {
  const {data} = useAppSelector(state => state.datesReducer)
  return (
    <div>
      {
        data && data.map(oneDate => <TimelineComponent key={oneDate.id} oneDate={oneDate} dashboard={dashboard}/>)

      }
    </div>
  );
};

export default AllDatesComponent;