import {axiosInstanse} from "./axios.api.service";
import {apiUrls} from '../costants/Urls';


export const getFileApiService = {
    uploadGedFile: async (fileGed:  FileList) => {
        try {
            const formData = new FormData();
            formData.append('file', fileGed[0]); // у мене такий тип у свагері, треба форм дату
            await axiosInstanse.post(apiUrls.uploadGed.uploadGed, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        } catch (error: any) {
            console.error('load file failed:', error?.response?.data || error);
            throw error
        }
    },

    deleteAll: async () => {
        try {
            await axiosInstanse.delete(apiUrls.uploadGed.deleteGed)
                } catch (error: any) {
            console.error('delete all Base failed:', error?.response?.data || error);
            throw error
                }
    }
}