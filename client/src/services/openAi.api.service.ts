import {axiosInstanse} from "./axios.api.service";
import {baseUrls} from '../costants/Urls';
import {IAskopenAiModell} from "../models/IAskopenAiModell";
import {IRespOpenAiModell} from "../models/IRespOpenAiModell";

export const OpenAiApiService = {
    getAnswer: async (askAiData: IAskopenAiModell): Promise<IRespOpenAiModell> => {
        try {
            const {data} = await axiosInstanse.post<IRespOpenAiModell>(baseUrls.openAi, askAiData)
            return data
                } catch (error: any) {
            console.error('there are no answer', error?.response?.data || error);
            throw error
                }
}
}