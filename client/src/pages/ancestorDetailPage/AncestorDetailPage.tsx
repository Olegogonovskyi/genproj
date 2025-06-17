import { IAncestorModel } from '../../models/IAncestorModel';
import { AncestorsApiService } from '../../services/ancestors.api.service';
import AncestorDetailComponent from '../../components/ancestorDetailComponent/AncestorDetailComponent';
import React, { FC, useEffect, useState } from 'react';
import { useEntityDetailPage } from '../../hooks/useEntityDetailPage';
import { apiParams } from '../../costants/Urls';
import { dateMatcher } from '../../helpers/dateMatcher';
import { useAppDispatch } from '../../redux/store';
import { datesActions } from '../../redux/slices/datesSlice';
import AllDatesPage from '../allDatesPage/AllDatesPage';
import style from './AncestorDetailPage.module.css'

const AncestorDetailPage: FC = () => {
console.log('ddddddd')
  const dispatch = useAppDispatch();
  const { entity: person, loading, error } = useEntityDetailPage<IAncestorModel>({
    selector: state => state.ancestorsReducer,
    loadAction: AncestorsApiService.getAncestorById,
    paramName: apiParams.ancestorId,
  });
  const [yearsLoaded, setYearsLoaded] = useState(false);
  const [yearStart, yearEnd] = dateMatcher(
    person?.birthDateandPlace?.date,
    person?.deathDateandPlace?.date
  );

  useEffect(() => {
    if (yearStart !== null || yearEnd !== null) {
      dispatch(datesActions.AllDatesLoad({ qwerty: { yearStart, yearEnd } }))
        .then(() => setYearsLoaded(true));
    } else {
      setYearsLoaded(false);
    }
  }, [yearStart, yearEnd]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading person details</div>;
  if (!person) return null;

  return (
    <div className={style.wrapper}>
      <AncestorDetailComponent key={person.id} entity={person}/>
      {yearsLoaded && (person.birthDateandPlace.date || person.deathDateandPlace.date) && <AllDatesPage/>}
    </div>
  );
};

export default AncestorDetailPage;
