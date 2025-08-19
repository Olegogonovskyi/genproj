import React, {FC} from 'react';
import {IRespOpenAiModell} from "../../models/IRespOpenAiModell";
import style from './RespOpenAiComponent.module.css'

const RespOpenAiComponent: FC<{openAiRespone: IRespOpenAiModell}> = ({openAiRespone}) => {
    const {ruler, worldSituation, country} = openAiRespone
    return (
        <div>

            <aside className={style.resppanel}>
                <h2 className={style.respcountry}>{country}</h2>
                <h3 className={style.respruler}>Правитель: {ruler}</h3>

                <div className={style.respworldsituation}>
                    <h4 className={style.resptitle}>Світова ситуація</h4>
                    <p className={style.resptext}>{worldSituation}</p>
                </div>
            </aside>
        </div>
    );
};

export default RespOpenAiComponent;