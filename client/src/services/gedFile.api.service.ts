import {axiosInstanse} from "./axios.api.service";
import { uploadGed } from '../costants/Urls';


export const getFileApiService = {
    uploadGedFile: async (fileGed:  FileList) => {
        try {
            await axiosInstanse.post(uploadGed.uploadFile, fileGed, {
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