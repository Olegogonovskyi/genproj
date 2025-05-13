import { withEntityLoader } from '../../hoc/withEntityLoader';
import AllDatesComponent from '../../components/allDatesComponent/AllDatesComponent';
import { datesActions } from '../../redux/slices/datesSlice';

export default withEntityLoader(
  AllDatesComponent,
  datesActions.AllDatesLoad,
  (state) => state.datesReducer,
);