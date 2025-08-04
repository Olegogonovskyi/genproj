import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';
import { useNavigate } from 'react-router-dom';
import { apiUrls } from '../../costants/Urls';
import style from './AncestorComponent.module.css';

const AncestorComponent: FC<{ancestor: IAncestorModel}> = ({ancestor}) => {
  const navigate = useNavigate()
  const {id, name, surName, birthDateandPlace, deathDateandPlace, marriedSurName, sex, note, familyAsParent, familyAsChild, npfx } = ancestor
  const parentOne = familyAsChild?.[0]?.parents?.[0];
  const parentTwo = familyAsChild?.[0]?.parents?.[1];
  return (
    <div>
      <div className={`${style.gridWrapOne} ${style.gridTemplateColumns}`}>
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
      <div className={`${style.gridWrap} ${style.gridTemplateColumns}`}>
        <div>{npfx}</div>
        <div>{sex}</div>
        <div onClick={()=> {
          navigate(apiUrls.ancestors.getAncestorById(id))
        }}>{name} <br />
          батьки:
          {parentOne && (
            <div>
              {parentOne.name} {parentOne.surName}
            </div>
          )}
          {parentTwo && (
            <div>
              {parentTwo.name} {parentTwo.surName}
            </div>
          )}</div>
        <div>{surName}</div>
        <div>{marriedSurName}</div>
        <div>{birthDateandPlace?.date}</div>
        <div>{birthDateandPlace?.place}</div>
        <div>
          {familyAsParent?.map((f, i) => (
            <div key={i}>{f.dateOfMarry?.date}</div>
          ))}
        </div>
        <div>
          {familyAsParent?.map((f, i) => (
            <div key={i}>{f.dateOfMarry?.place}</div>
          ))}
        </div>
        <div>{deathDateandPlace?.date}</div>
        <div>{deathDateandPlace?.place}</div>
        <div>{note}</div>
      </div>
    </div>
  );
};

export default AncestorComponent;