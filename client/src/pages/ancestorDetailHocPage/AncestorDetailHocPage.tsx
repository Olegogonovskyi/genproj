import { IAncestorModel } from '../../models/IAncestorModel';
import { AncestorsApiService } from '../../services/ancestors.api.service';
import AncestorDetailComponent from '../../components/ancestorDetailComponent/AncestorDetailComponent';
import { WithEntityDetailPage } from '../../hoc/withEntityDetaipPage';

export const AncestorDetailHocPage = WithEntityDetailPage<IAncestorModel>(
  AncestorDetailComponent,
  AncestorsApiService.getAncestorById,
  'ancestorId',
  (state) => state.ancestorsReducer
);