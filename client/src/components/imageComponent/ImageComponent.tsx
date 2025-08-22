import React, {FC} from 'react';
import style from './ImageComponent.module.css'
import {UploadFotoApiService} from "../../services/uploadFoto.api.service";
import {useNavigate} from "react-router-dom";
import {baseUrls} from "../../costants/Urls";

const ImageComponent: FC<{ imageUrl: string }> = ({imageUrl}) => {
    const navigate = useNavigate()

    const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const keyToDell = imageUrl.split('/').slice(-2).join('/');

    const copyLink = async () => {
      try {
          await navigator.clipboard.writeText(imageUrl);
      } catch (error) {
          console.error(error)
      }
    }

    return (
        <div className={style.wrap}>
            <img src={imageUrl} alt={imageName}/>
            <p>{imageName}</p>
            <button onClick={() => copyLink()}>Копіювати лінку</button>
            <button onClick={async () => {
                await UploadFotoApiService.deleteImage(keyToDell);
                navigate(`/${baseUrls.adminDashboard}/${baseUrls.images}`)
            }}>Видалити</button>
        </div>
    );
};

export default ImageComponent;