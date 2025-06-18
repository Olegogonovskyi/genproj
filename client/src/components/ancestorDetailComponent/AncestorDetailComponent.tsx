import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';
import { apiUrls } from '../../costants/Urls';
import { useNavigate } from 'react-router-dom';
import { IAncestorMiniModel } from '../../models/IAncestorMiniModel';
import style from './AncestorDetailComponent.module.css'


const AncestorDetailComponent: FC<{entity: IAncestorModel}> = ({entity}) => {
  const navigate = useNavigate()
  const {id, name, surName, birthDateandPlace, deathDateandPlace, marriedSurName, sex, note, familyAsParent, familyAsChild, npfx } = entity
  const [parentOne, parentTwo] = familyAsChild?.[0]?.parents || [];

  const renderAncestorLink = (ancestor: IAncestorMiniModel | undefined) =>
    ancestor && (
      <div className={style.link} onClick={() => navigate(apiUrls.ancestors.getAncestorById(ancestor.id))}>
        {ancestor.name} {ancestor.surName}
      </div>
    );


  return (
    <div className={style.wrapper}>
      <div className={style.title}>{npfx} {name} ({surName}) {marriedSurName}</div>

      <div className={style.section}>
        <span className={style.sectionLabel}>Стать:</span>
        <span>{sex}</span>
      </div>

      <div className={style.section}>
        <span className={style.sectionLabel}>Народження:</span>
        <span>{birthDateandPlace?.date} {birthDateandPlace?.place}</span>
      </div>

      <div className={style.section}>
        <span className={style.sectionLabel}>Смерть:</span>
        <span>{deathDateandPlace?.date} {deathDateandPlace?.place}</span>
      </div>

      <div className={style.section}>
        <span className={style.sectionLabel}>Шлюб:</span>
        {familyAsParent?.map((f, i) => {
          const pair = f.parents?.find(p => p.id !== id);
          return (
            <div key={i}>
              {f.dateOfMarry?.date} {f.dateOfMarry?.place}
              {pair && <div onClick={() => navigate(apiUrls.ancestors.getAncestorById(pair.id))}>{` — ${pair.name} ${pair.surName}`}</div>}
            </div>
          );
        })}
      </div>

      <div className={style.section}>
        <span className={style.sectionLabel}>Батьки:</span>
        {renderAncestorLink(parentOne)}
        {renderAncestorLink(parentTwo)}
      </div>

      <div className={style.section}>
        <span className={style.sectionLabel}>Діти:</span>
        {familyAsParent?.flatMap(f => f.children).map((child, index) => (
          <div key={index} onClick={() => navigate(apiUrls.ancestors.getAncestorById(child.id))}>
            {child.name} {child.surName} {child.marriedSurName} (
            {child.birthDateandPlace?.date} {child.birthDateandPlace?.place} -
            {child.deathDateandPlace?.date} {child.deathDateandPlace?.place}
            )
          </div>
        ))}
      </div>

      {note && (
        <div className={style.section}>
          <span className={style.sectionLabel}>Примітки:</span>
          <span>{note}</span>
        </div>
      )}
    </div>
  );
};

export default AncestorDetailComponent;