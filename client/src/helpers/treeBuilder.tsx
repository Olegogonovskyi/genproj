import {articlesApiService} from "../services/articles.api.service";
import React from "react";
import {IPeopleTreModel} from "../models/IPeopleTreModel";
import style from "../pages/mainPage/MainPage.module.css";

export const TreeBuilder = (people: IPeopleTreModel[]) => {
  return <div className={style.wrapper}>
    {people.map(({ name, years, className }) => (
        <div
            key={name}
            className={`${style[className]}`}
            onClick={() => articlesApiService.searchArticles({ qwerty: { tag: name.replace(/[\s-]/g, '')}})}
        >
          <h3>
            {name}
            {years && (
                <>
                  <br />
                  <p>{years}</p>
                </>
            )}
          </h3>
        </div>
    ))}
  </div>
}