import React, {FC} from "react";
import style from "./TreeBuilderComponent.module.css";
import {useNavigate} from "react-router-dom";
import {IPeopleTreModel} from "../../models/IPeopleTreModel";
import {apiUrls} from "../../costants/Urls";


const TreeBuilderComponent: FC<{people:  IPeopleTreModel[]}> = ({people}) => {
    const navigate = useNavigate();
    return (
        <div className={style.wrapper}>
            {people.map(({ name, years, className }) => (
                <div
                    key={name}
                    className={`${style[className]}`}
                    onClick={() => navigate(`${apiUrls.article.getAll}?tag=${name.replace(/[\s-]/g, '')}`)}
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
    );
};

export default TreeBuilderComponent;


// articlesApiService.searchArticles({ qwerty: { tag: name.replace(/[\s-]/g, '')}})