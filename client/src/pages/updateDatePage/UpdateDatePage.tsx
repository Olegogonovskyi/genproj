import React, {FC} from 'react';
import { useParams } from 'react-router-dom';
import UpdateDateComponent from '../../components/updateDateComponent/UpdateDateComponent';

const UpdateDatePage: FC = () => {
  const {dateId} = useParams()
  return (
    <div>
      {
        dateId && <UpdateDateComponent key={dateId}  dateToUpdateId={dateId}/>
      }
    </div>
  );
};

export default UpdateDatePage;