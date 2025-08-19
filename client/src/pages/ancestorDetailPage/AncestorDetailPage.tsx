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
import AskOpenAiComponent from "../../components/askOpenAiComponent/AskOpenAiComponent";

const AncestorDetailPage: FC = () => {
  const dispatch = useAppDispatch();
  const { entity: person, loading, error } = useEntityDetailPage<IAncestorModel>({
    selector: state => state.ancestorsReducer,
    loadAction: AncestorsApiService.getAncestorById,
    paramName: apiParams.ancestorId,
  });
  const [yearsLoaded, setYearsLoaded] = useState(false);
  const [start, end] = dateMatcher(
    person?.birthDateandPlace?.date,
    person?.deathDateandPlace?.date
  );

  useEffect(() => {
    if (!person || yearsLoaded) return;

    if (start !== null || end !== null) {
      dispatch(datesActions.AllDatesLoad({ qwerty: { yearStart: start, yearEnd: end } }))
        .then(() => setYearsLoaded(true));
    }
  }, [person]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading person details</div>;
  if (!person) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.AncestorDetailComponent}><AncestorDetailComponent key={person.id} entity={person}/></div>
      <div className={style.AllDatesPage}>{yearsLoaded && (person.birthDateandPlace.date || person.deathDateandPlace.date) && <AllDatesPage key={person.id} yearStart={start} yearEnd={end}/>}</div>
        <div className={style.AskAi}><AskOpenAiComponent key={person.name} askOpenAiInfo={{id: person.id, place: person.birthDateandPlace.place, yearStart: start, yearEnd: end}} worldSituation={person.worldSituation || undefined}/></div>
    </div>
  );
};

export default AncestorDetailPage;
