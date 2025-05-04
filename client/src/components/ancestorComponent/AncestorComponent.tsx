import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';

const AncestorComponent: FC<{ancestor: IAncestorModel}> = ({ancestor}) => {
  const {id, name, surName } = ancestor
  return (
    <div>
      <h3>{id}: {name} {surName}</h3>
    </div>
  );
};

export default AncestorComponent;