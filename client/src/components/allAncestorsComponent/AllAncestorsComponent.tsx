import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import AncestorComponent from '../ancestorComponent/AncestorComponent';

const AllAncestorsComponent: FC = () => {
  const {data} = useAppSelector(state => state.ancestorsReducer)

  return (
    <div>
      <h1>AllArticlesCompnent</h1>
      {
        data && data.map(ancestor => <AncestorComponent key={ancestor.id} ancestor={ancestor} />)
      }
      <h1>AllArticlesCompnent</h1>

    </div>
  );
};

export default AllAncestorsComponent;