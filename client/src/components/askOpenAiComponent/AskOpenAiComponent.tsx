import React, {FC, useState} from 'react';
import {IAskopenAiModell} from "../../models/IAskopenAiModell";
import {OpenAiApiService} from "../../services/openAi.api.service";
import {IRespOpenAiModell} from "../../models/IRespOpenAiModell";
import RespOpenAiComponent from "../respOpenAiComponent/RespOpenAiComponent";
import style from './AskOpenAiComponent.module.css'

const AskOpenAiComponent: FC<{askOpenAiInfo: IAskopenAiModell, worldSituation?: string | undefined}> = ({askOpenAiInfo, worldSituation}) => {

    const [openAiResp, setOpenAiResp] = useState<IRespOpenAiModell>()
console.log(askOpenAiInfo)
    const handleFetch = async () => {
        try {
            if (worldSituation) {
                setOpenAiResp(JSON.parse(worldSituation));
            }
            const responseAi = await OpenAiApiService.getAnswer(askOpenAiInfo);
            setOpenAiResp(responseAi);
        } catch (error) {
            console.log("Сталася помилка при отриманні відповіді");
        }
    };

    return (
        <div>
            {openAiResp ? (
                <RespOpenAiComponent openAiRespone={openAiResp} key={askOpenAiInfo.id} />
            ) : (
                <button onClick={handleFetch}> Що то були за часи?</button>
            )}
        </div>
    );
};

export default AskOpenAiComponent;