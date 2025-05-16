import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { ILoadActionType } from '../models/types/ILoadActionType';

export const WithEntityDetailPage = <EntityType extends { id: string }>(
  Component: FC<{ entity: EntityType }>,
  loadAction: ILoadActionType<EntityType>,
  paramName: string,
  selector: (state: any) => { data: EntityType[] }
) => {
  const WrappedComponent: FC = () => {
    const params = useParams();
    const { data } = useAppSelector(selector);
    const [entity, setEntity] = useState<EntityType | null>(null);
    const entityId = params[paramName];

    useEffect(() => {
      if (!entityId) return;

      const localEntity = data.find(item => item.id === entityId);
      if (localEntity) {
        setEntity(localEntity);
      } else {
        loadAction(entityId)
          .then(setEntity)
          .catch(error => {
            console.error('Load one Entity failed:', error?.response?.data || error);
          });
      }
    }, [entityId, data]);

    return <>{entity && <Component entity={entity} />}</>;
  };

  return WrappedComponent;
};
