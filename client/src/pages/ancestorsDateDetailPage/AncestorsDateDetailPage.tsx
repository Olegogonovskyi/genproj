import React, {FC} from 'react';
import { useEntityDetailPage } from '../../hooks/useEntityDetailPage';
import { apiParams } from '../../costants/Urls';
import { IAncestorDateModel } from '../../models/IAncestorDateModel';
import { AncestorDatesApiService } from '../../services/ancestorDates.api.service';
import AncestorsDataDetailComponent from '../../components/ancestorsDataDetailComponent/AncestorsDataDetailComponent';

const AncestorsDateDetailPage: FC = () => {

  const { entity: ancestorsDate, loading, error } = useEntityDetailPage<IAncestorDateModel>({
    selector: state => state.ancestorsDateReducer,
    loadAction: AncestorDatesApiService.getAncestorDateById,
    paramName: apiParams.eventId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading person details</div>;
  if (!ancestorsDate) return null;

  return (
    <div>
      <AncestorsDataDetailComponent key={ancestorsDate.id} entity={ ancestorsDate }/>
    </div>
  );
};

export default AncestorsDateDetailPage;