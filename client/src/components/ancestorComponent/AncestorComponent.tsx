import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';
import { useNavigate } from 'react-router-dom';
import { apiUrls } from '../../costants/Urls';
import style from '../allAncestorsComponent/AllAncestorsComponent.module.css';

const AncestorComponent: FC<{ancestor: IAncestorModel}> = ({ancestor}) => {
  const navigate = useNavigate()
  const {id, name, surName, birthDateandPlace, deathDateandPlace, marriedSurName, sex, note, familyAsParent, familyAsChild, npfx } = ancestor
  const parentOne = familyAsChild?.[0]?.parents?.[0];
  const parentTwo = familyAsChild?.[1]?.parents?.[1];
  return (
    <div>
      <div className={style.gridWrap}>
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

      {/*<h3>{id}: {name} {surName} {marriedSurName}</h3>*/}
      {/*<h4>Birth: </h4>  {birthDateandPlace?.date && <h4>{birthDateandPlace.date}</h4>}*/}
      {/*<h4>Death: </h4>  {deathDateandPlace?.date && <h4>{deathDateandPlace.date}</h4>}*/}

      {/*<button onClick={()=> {*/}
      {/*  navigate(apiUrls.ancestors.getAncestorById(id))*/}
      {/*}}> detail </button>*/}
    </div>
  );
};

export default AncestorComponent;