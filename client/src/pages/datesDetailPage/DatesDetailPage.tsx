// export default WithEntityIDLoader(
//   AllDatesComponent,
//   datesActions.DateByIdLoad,
//   'dateId'
// )

import React, {FC} from 'react';
import { useEntityDetailPage } from '../../hooks/useEntityDetailPage';
import AllDatesComponent from '../../components/allDatesComponent/AllDatesComponent';
import { IDateModel } from '../../models/iDateModel';
import { ChronologyApiService } from '../../services/chronology.api.service';
import { apiParams } from '../../costants/Urls';

const DatesDetailPage: FC = () => {

  const { entity: person, loading, error } = useEntityDetailPage<IDateModel>({
    selector: state => state.ancestorsReducer,
    loadAction: ChronologyApiService.getDateById,
    paramName: apiParams.chronologyId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading person details</div>;
  if (!person) return null;

  return (
    <div>
      <AllDatesComponent key={person.id} entity={person}/>
    </div>
  );
};

export default DatesDetailPage;