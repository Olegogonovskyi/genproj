import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import AncestorComponent from '../ancestorComponent/AncestorComponent';
import style from './AllAncestorsComponent.module.css'

const AllAncestorsComponent: FC = () => {
  const {data} = useAppSelector(state => state.ancestorsReducer)
  return (
    <div>
      <div className={style.gridWrap}>
        <div>Зв.</div>
        <div>Стать</div>
        <div>Ім'я</div>
        <div>Прізвище</div>
        <div>Прізвище після одруження</div>
        <div>Дата народження</div>
        <div>Місце народження</div>
        <div>Дата одруження</div>
        <div>Місце одруження</div>
        <div>Дата смерті</div>
        <div>Місце смерті</div>
        <div>Примітка</div>
      </div>
      {
        data && data.map(ancestor => <AncestorComponent key={ancestor.id} ancestor={ancestor} />)
      }
    </div>
  );
};

export default AllAncestorsComponent;