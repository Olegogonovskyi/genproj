import {axiosInstanse} from "./axios.api.service";
import {baseUrls} from "../costants/Urls";

export const UploadFotoApiService = {
    uploadFoto: async (uploadImage: FormData)=>  {
        const {data} = await axiosInstanse.post<string>(baseUrls.images, uploadImage, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data
},

}