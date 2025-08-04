import {articlesApiService} from "../services/articles.api.service";
import React from "react";
import {IPeopleTreModel} from "../models/IPeopleTreModel";

export const TreeBuilder = (people: IPeopleTreModel) => {
  return <div>
    {people.map(({ name, years, tag, className }) => (
        <div
            key={tag}
            className={className}
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