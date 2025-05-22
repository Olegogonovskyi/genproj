import {axiosInstanse} from "./axios.api.service";
import { apiUrls } from '../costants/Urls';


export const getFileApiService = {
    uploadGedFile: async (fileGed:  FileList) => {
        try {
            await axiosInstanse.post(apiUrls.uploadGed.upload, fileGed, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        } catch (error: any) {
            console.error('load file failed:', error?.response?.data || error);
            throw error
        }
    }
}