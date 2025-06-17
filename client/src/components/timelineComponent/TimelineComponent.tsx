import React, {FC} from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { IDateModel } from '../../models/iDateModel';
import { useNavigate } from 'react-router-dom';

const TimelineComponent: FC<{oneDate: IDateModel}> = ({oneDate}) => {
  const navigate = useNavigate()
  const {id, year, description} = oneDate
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {year}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{description}</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default TimelineComponent;
