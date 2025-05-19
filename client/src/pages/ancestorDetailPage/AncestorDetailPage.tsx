import { IAncestorModel } from '../../models/IAncestorModel';
import { AncestorsApiService } from '../../services/ancestors.api.service';
import AncestorDetailComponent from '../../components/ancestorDetailComponent/AncestorDetailComponent';
import React, {FC} from 'react';
import { useEntityDetailPage } from '../../hooks/useEntityDetailPage';

const AncestorDetailPage: FC = () => {

  const { entity: person, loading, error } = useEntityDetailPage<IAncestorModel>({
    selector: state => state.ancestorsReducer,
    loadAction: AncestorsApiService.getAncestorById,
    paramName: 'ancestorId',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading person details</div>;
  if (!person) return null;

  return (
    <div>
<AncestorDetailComponent key={person.id} entity={person}/>
    </div>
  );
};

export default AncestorDetailPage;
