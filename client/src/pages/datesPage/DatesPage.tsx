import { WithEntityIDLoader } from '../../hoc/withEntityIDLoader';
import AllDatesComponent from '../../components/allDatesComponent/AllDatesComponent';
import { datesActions } from '../../redux/slices/datesSlice';

export default WithEntityIDLoader(
  AllDatesComponent,
  datesActions.DateByIdLoad,
  'dateId'
)