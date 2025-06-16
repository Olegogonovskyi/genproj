import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';
import { useNavigate } from 'react-router-dom';
import { apiUrls } from '../../costants/Urls';

const AncestorComponent: FC<{ancestor: IAncestorModel}> = ({ancestor}) => {
  const navigate = useNavigate()
  const {id, name, surName, birthDateandPlace, deathDateandPlace, marriedSurName } = ancestor
  return (
    <div>
      <h3>{id}: {name} {surName} {marriedSurName}</h3>
      <h4>Birth: </h4>  {birthDateandPlace?.date && <h4>{birthDateandPlace.date}</h4>}
      <h4>Death: </h4>  {deathDateandPlace?.date && <h4>{deathDateandPlace.date}</h4>}

      <button onClick={()=> {
        navigate(apiUrls.ancestors.getAncestorById(id))
      }}> detail </button>
    </div>
  );
};

export default AncestorComponent;