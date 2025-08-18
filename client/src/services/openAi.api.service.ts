import {axiosInstanse} from "./axios.api.service";
import {baseUrls} from '../costants/Urls';
import {IAskopenAiModell} from "../models/IAskopenAiModell";

export const OpenAiApiService = {
    getAnswer: async (askAiData: IAskopenAiModell): Promise<IAskopenAiModell> => {
        try {
            const {data} = await axiosInstanse.post<IAskopenAiModell>(baseUrls.openAi)
            return data
                } catch (error: any) {
            console.error('there are no answer', error?.response?.data || error);
            throw error
                }
}
}