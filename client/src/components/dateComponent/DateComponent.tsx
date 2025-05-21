import React, { FC } from 'react';
import { IDateModel } from '../../models/iDateModel';
import { useNavigate } from 'react-router-dom';
import { baseUrls } from '../../costants/Urls';
import { ChronologyApiService } from '../../services/chronology.api.service';

const DateComponent: FC<{oneDate: IDateModel}> = ({oneDate}) => {
  const navigate = useNavigate()
  const {id, year, description} = oneDate
  return (
    <div>
      <h3>{year} - {description}</h3>
      <button onClick={()=> {
        navigate(`${baseUrls.baseChronologyAdmin}/${id}`)
      }}> update </button>
      <button onClick={async ()=> {
       await ChronologyApiService.deleteDate(id)

      }}> delete </button>
    </div>
  );
};

export default DateComponent;