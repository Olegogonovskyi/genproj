import {IUserRespModel} from "../models/IUserRespModel";
import {ILoadType} from "../models/types/ILoadType";

export const initialUserState: IUserRespModel & ILoadType = {
    user: {
        name: '',
        deviceId: '',
        authMethod: '',
        isVerified: false,
        email: '',
        role: 'reader',
        id: ''
    },
    tokens: {
        accessToken: '',
        refreshToken: ''
    },
    loading: false,
    error: null,
    isLoaded: false
};