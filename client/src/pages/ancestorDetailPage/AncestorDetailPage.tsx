import { IAncestorModel } from '../../models/IAncestorModel';
import { AncestorsApiService } from '../../services/ancestors.api.service';
import AncestorDetailComponent from '../../components/ancestorDetailComponent/AncestorDetailComponent';
import React, {FC, useEffect} from 'react';
import { useEntityDetailPage } from '../../hooks/useEntityDetailPage';
import { apiParams } from '../../costants/Urls';
import { dateMatcher } from '../../helpers/dateMatcher';
import { useAppDispatch } from '../../redux/store';
import { datesActions } from '../../redux/slices/datesSlice';

const AncestorDetailPage: FC = () => {

  const { entity: person, loading, error } = useEntityDetailPage<IAncestorModel>({
    selector: state => state.ancestorsReducer,
    loadAction: AncestorsApiService.getAncestorById,
    paramName: apiParams.ancestorId,
  });

  const [yearStart, yearEnd] = dateMatcher(person?.birthDateandPlace?.date, person?.deathDateandPlace?.date)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (yearStart && yearEnd) {
      dispatch(datesActions.AllDatesLoad({ qwerty: { yearStart, yearEnd } }));
    }
  }, [yearStart, yearEnd, dispatch]);

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
