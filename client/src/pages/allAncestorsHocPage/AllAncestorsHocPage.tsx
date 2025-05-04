import { withEntityLoader } from '../../hoc/withEntityLoader';
import AllAncestorsComponent from '../../components/allAncestorsComponent/AllAncestorsComponent';
import { ancestorsActions } from '../../redux/slices/ancestorsSlice';

export default withEntityLoader(
  AllAncestorsComponent,
  ancestorsActions.AllAncestorsLoad,
  (state) => state.ancestorsReducer,
);