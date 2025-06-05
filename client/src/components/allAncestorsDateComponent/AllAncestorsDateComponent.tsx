import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import AncestorDateComponent from '../ancestorDateComponent/AncestorDateComponent';

const AllAncestorsDateComponent: FC = () => {
  const {data} = useAppSelector(state => state.ancestorsDateReducer)
  return (
    <div>
      {
        data && data.map(ancestorDate => <AncestorDateComponent key={ancestorDate.id} ancestorDate={ancestorDate} />)
      }
    </div>
  );
};

export default AllAncestorsDateComponent;