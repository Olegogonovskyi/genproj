import React, { FC, useEffect, useState } from 'react';
import AncestorDetailComponent from '../../components/ancestorDetailComponent/AncestorDetailComponent';
import { useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { AncestorsApiService } from '../../services/ancestors.api.service';
import { IAncestorModel } from '../../models/IAncestorModel';

const AncestorDetailPage:FC = () => {
  const { ancestorId } = useParams();
  const {data} = useAppSelector(state => state.ancestorsReducer)
  const [ancestor, setAncestor] = useState<IAncestorModel | null>(null);

  useEffect(() => {
    if (!ancestorId) return;

    const localAncestor = data.find(item => item.id === ancestorId);
    if (localAncestor) {
      setAncestor(localAncestor);
    } else {
      AncestorsApiService.getAncestorById(ancestorId)
        .then(setAncestor)
        .catch(error => {
          console.error('Load one Ancestor failed:', error?.response?.data || error);
        });
    }
  }, [ancestorId, data]);

  return (
    <div>
      {
        ancestor && <AncestorDetailComponent key={ancestor.id}  ancestor={ancestor}/>
      }
    </div>
  );
};

export default AncestorDetailPage;