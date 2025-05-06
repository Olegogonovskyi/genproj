import React, {FC, useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { ancestorsActions } from '../../redux/slices/ancestorsSlice';
import AllAncestorsComponent from '../../components/allAncestorsComponent/AllAncestorsComponent';

const AncestorsPage: FC = () => {
  const {ancestorId} = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (ancestorId) {
      dispatch(ancestorsActions.AncestorByIdLoad(ancestorId));
    }
  }, [ancestorId]);
  return (
    <div>
      <AllAncestorsComponent/>
    </div>
  );
};

export default AncestorsPage;