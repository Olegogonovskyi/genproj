import React, {FC} from 'react';
import { useEntityDetailPage } from '../../hooks/useEntityDetailPage';
import { IDateModel } from '../../models/iDateModel';
import { ChronologyApiService } from '../../services/chronology.api.service';
import { apiParams } from '../../costants/Urls';
import DatesDetailComponent from '../../components/datesDetailComponent/DatesDetailComponent';

const DatesDetailPage: FC = () => {

  const { entity: dateFromBase, loading, error } = useEntityDetailPage<IDateModel>({
    selector: state => state.ancestorsReducer,
    loadAction: ChronologyApiService.getDateById,
    paramName: apiParams.chronologyId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading person details</div>;
  if (!dateFromBase) return null;

  return (
    <div>
      <DatesDetailComponent key={dateFromBase.id} entity={dateFromBase}/>
    </div>
  );
};

export default DatesDetailPage;