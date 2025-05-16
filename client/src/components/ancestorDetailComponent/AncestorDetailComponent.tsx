import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';

const AncestorDetailComponent: FC<{ancestor: IAncestorModel}> = ({ancestor}) => {

  const {id, name, surName } = ancestor
  return (
    <div>
      <h1>{id}: {name} {surName}</h1>

    </div>
  );
};

export default AncestorDetailComponent;