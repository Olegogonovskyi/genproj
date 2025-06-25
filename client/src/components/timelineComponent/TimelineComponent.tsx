import React, {FC} from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { IDateModel } from '../../models/iDateModel';
import {useNavigate} from "react-router-dom";
import {apiUrls} from "../../costants/Urls";
import {ChronologyApiService} from "../../services/chronology.api.service";

const TimelineComponent: FC<{oneDate: IDateModel, dashboard?: boolean}> = ({oneDate, dashboard}) => {
  const navigate = useNavigate()
  const { year, description} = oneDate
  if (!dashboard) {
    return (
        <Timeline sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}>
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
  }
  return (
    <Timeline sx={{
      [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.2,
      },
    }}>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {year}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{description}</TimelineContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><div>
          <button onClick={() => {
            navigate(`/:${oneDate.id}`)
          }}>Редагувати</button>
          <button onClick={async () => {
            await ChronologyApiService.deleteDate(oneDate.id)
          }}>Видалити</button>
        </div></TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default TimelineComponent;
