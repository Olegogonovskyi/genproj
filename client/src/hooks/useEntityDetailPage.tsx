import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

export const useEntityDetailPage = <T, >({
                                                       selector,
                                                       loadAction,
                                                       paramName,
                                                     }: {
  selector: (state: any) => { data: T[] },
  loadAction: (id: string) => Promise<T>,
  paramName: string,
}) => {
  const params = useParams();
  const idFromParams = params[paramName];
  const { data } = useAppSelector(selector);
  const [entity, setEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!idFromParams) return;

    const localEntity = data.find(item => (item as any).id === idFromParams);
    if (localEntity) {
      setEntity(localEntity);
    } else {
      setLoading(true);
      loadAction(idFromParams)
        .then((fetched) => setEntity(fetched))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, [idFromParams, data]);

  return { entity, loading, error };
};
