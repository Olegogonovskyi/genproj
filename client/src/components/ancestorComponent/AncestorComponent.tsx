import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';
import { useNavigate } from 'react-router-dom';
import { baseUrls } from '../../costants/Urls';

const AncestorComponent: FC<{ancestor: IAncestorModel}> = ({ancestor}) => {
  const navigate = useNavigate()
  const {id, name, surName } = ancestor
  return (
    <div>
      <h3>{id}: {name} {surName}</h3>
      <button onClick={()=> {
        navigate(`${baseUrls.baseAncestors}/${id}`)
      }}> detail </button>
    </div>
  );
};

export default AncestorComponent;