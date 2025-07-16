import {axiosInstanse} from "./axios.api.service";
import {baseUrls} from "../costants/Urls";
import { IImageQueryModel } from "../models/IImageQueryModel";
import {IImageResModel} from "../models/IImageResModel";

export const UploadFotoApiService = {
    uploadFoto: async (uploadImage: FormData) => {
        try {
            const { data } = await axiosInstanse.post<string>(
                baseUrls.images,
                uploadImage,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return data;
        } catch (error) {
            console.error('Помилка під час завантаження зображення:', error);
            throw error;
        }
    },

    getAll: async ({limitUrls, fotoUrl, contineToken}: IImageQueryModel) => {
        try {
            const {data}  = await axiosInstanse.get<IImageResModel>(baseUrls.images, {params: {limitUrls: limitUrls || 10, fotoUrl: fotoUrl || undefined, contineToken: contineToken || undefined}} )
            return data
        } catch (error: any) {
            console.error('load All images failed:', error?.response?.data || error);
            throw error
                }
}

}