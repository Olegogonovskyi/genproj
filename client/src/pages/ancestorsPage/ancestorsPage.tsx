import { ancestorsActions } from '../../redux/slices/ancestorsSlice';
import AllAncestorsComponent from '../../components/allAncestorsComponent/AllAncestorsComponent';
import { WithEntityIDLoader } from '../../hoc/withEntityIDLoader';

export default WithEntityIDLoader(
  AllAncestorsComponent,
  ancestorsActions.AncestorByIdLoad,
  'ancestorId',
)
