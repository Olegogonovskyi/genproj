import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import AncestorComponent from '../ancestorComponent/AncestorComponent';

const AllAncestorsComponent: FC = () => {
  const {data} = useAppSelector(state => state.ancestorsReducer)
  console.log(data)
  return (
    <div>
      {
        data && data.map(ancestor => <AncestorComponent key={ancestor.id} ancestor={ancestor} />)
      }
    </div>
  );
};

export default AllAncestorsComponent;