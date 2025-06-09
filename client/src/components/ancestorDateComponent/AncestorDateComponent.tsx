import React, {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrls } from '../../costants/Urls';
import { IAncestorDateModel } from '../../models/IAncestorDateModel';

const AncestorDateComponent: FC<{ancestorDate: IAncestorDateModel}> = ({ancestorDate}) => {
  const navigate = useNavigate()
  const {id, date, type, place, familyPersons, personEvent} = ancestorDate
  return (
    <div>
        <h1>
          {date} {type} - {place} -
          {personEvent?.[0]?.name ?? ''} {personEvent?.[0]?.surName ?? ''}
        </h1>

        {familyPersons?.[0]?.parents?.map((parent) => (
          <h1 key={parent.id}>
            {parent.id}: {parent.name} {parent.surName} {parent.marriedSurName}
          </h1>
        ))}

      <button onClick={()=> {
        navigate(apiUrls.ancestors.getAncestorDateById(id))
      }}> detail </button>
    </div>
  );
};

export default AncestorDateComponent;