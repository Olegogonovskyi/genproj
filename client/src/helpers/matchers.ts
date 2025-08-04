import { RejectedAction } from '../models/types/IRejectedActionType';

const isPendingAction = (action: RejectedAction): boolean => {
  return action.type.endsWith('/pending');
};

const isRejectedAction = (action: RejectedAction): boolean => {
  return action.type.endsWith('/rejected');
};

const isFulfilledAction = (action: RejectedAction): boolean => {
  return action.type.endsWith('/fulfilled');
};

export {isFulfilledAction, isPendingAction, isRejectedAction}
