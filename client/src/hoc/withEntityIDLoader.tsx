import React, { FC, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

export const WithEntityIDLoader = (
                            ListComponent: FC<any>,
                            loadAction: Function,
                            paramName: string,
                            ) => {
  const WrappedComponent = (props: any) => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const idFromParams = params[paramName];

    useEffect(() => {
      if (idFromParams) {
      dispatch(loadAction(idFromParams));
    }
    }, [idFromParams]);

    return (
      <div>
        <ListComponent {...props}/>
        </div>
    );
  };

  return WrappedComponent;
};
