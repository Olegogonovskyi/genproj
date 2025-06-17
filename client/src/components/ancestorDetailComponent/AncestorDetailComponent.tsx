import React, {FC} from 'react';
import { IAncestorModel } from '../../models/IAncestorModel';
import { apiUrls } from '../../costants/Urls';
import { useNavigate } from 'react-router-dom';
import { IAncestorMiniModel } from '../../models/IAncestorMiniModel';

const AncestorDetailComponent: FC<{entity: IAncestorModel}> = ({entity}) => {
  const navigate = useNavigate()
  const {id, name, surName, birthDateandPlace, deathDateandPlace, marriedSurName, sex, note, familyAsParent, familyAsChild, npfx } = entity
  const [parentOne, parentTwo] = familyAsChild?.[0]?.parents || [];
  const pair = familyAsParent[0].parents.filter(oneParent => oneParent.id !== id)[0];

  const renderAncestorLink = (ancestor: IAncestorMiniModel | undefined) =>
    ancestor && (
      <div onClick={() => navigate(apiUrls.ancestors.getAncestorById(ancestor.id))}>
        {ancestor.name} {ancestor.surName}
      </div>
    );


  return (
    <div>
      <div>
        <div>{npfx} {name} ({surName}) {marriedSurName}</div>
        <div>{sex}</div>
        <div>Народження: {birthDateandPlace?.date} {birthDateandPlace?.place}</div>
        <div>Смерть: {deathDateandPlace?.date} {deathDateandPlace?.place} </div>
        <div>Шлюб:
          {familyAsParent?.map((f, i) => (
            <div key={i}>{f.dateOfMarry?.date} {f.dateOfMarry?.place} {pair && `${pair.name} ${pair.surName}`} </div>
          ))}
        </div>
        <div>Батьки:
          {renderAncestorLink(parentOne)}
          {renderAncestorLink(parentTwo)}
        </div>
        <div>Діти:
          {
            familyAsParent[0].children.map((child, index)=> (
              <div key={index} onClick={() => {navigate(apiUrls.ancestors.getAncestorById(child.id))}}>
                {child.name} {child.surName} {child.marriedSurName} ({child.birthDateandPlace?.date} {child.birthDateandPlace?.place} - {child.deathDateandPlace?.date} {child.deathDateandPlace?.place})
              </div>
            ))
          }
        </div>
        {note && <div>Примітки: {note}</div>}
        </div>
    </div>
  );
};

export default AncestorDetailComponent;