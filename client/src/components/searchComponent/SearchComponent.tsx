import React, {FC} from 'react';
import {useAppSelector} from '../../redux/store';
import style from './SearchComponent.module.css'

const SearchComponent: FC = () => {
    const {data} = useAppSelector(state => state.articlesReducer)
    return (
        <div>
            <div className={style.moviesgrid}>{
              data && data.map(article => article.id)}
            </div>
        </div>
    );
};

export default SearchComponent;