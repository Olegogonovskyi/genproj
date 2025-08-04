import React, {FC, useEffect, useState} from 'react';
import ImageComponent from "../imageComponent/ImageComponent";
import {IImageResModel} from "../../models/IImageResModel";
import {UploadFotoApiService} from "../../services/uploadFoto.api.service";
import style from './AllImagesComponent.module.css'

const AllImagesComponent: FC = () => {
const [imageUrls, setImageUrls] = useState<IImageResModel>({urls: [], nextToken: ''})

    useEffect( () => {
         UploadFotoApiService.getAll({}).then(value => setImageUrls(value))
    }, []);

    return (
        <div className={style.wrap}>
            {
                imageUrls && imageUrls?.urls?.map((value, index) => <ImageComponent imageUrl={value} key={index}/> )
            }
        </div>
    );
};

export default AllImagesComponent;