import React, {FC} from 'react';
import style from './ImageComponent.module.css'
import {UploadFotoApiService} from "../../services/uploadFoto.api.service";

const ImageComponent: FC<{ imageUrl: string }> = ({imageUrl}) => {
    const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const keyToDell = imageUrl.split('/').slice(-2).join('/');

    const copyLink = async () => {
      try {
          await navigator.clipboard.writeText(imageUrl);
      } catch (error) {
          console.log(error)
      }
    }

    return (
        <div className={style.wrap}>
            <img src={imageUrl} alt={imageName}/>
            <p>{imageName}</p>
            <button onClick={() => copyLink()}>Копіювати лінку</button>
            <button onClick={async () => await UploadFotoApiService.deleteImage(keyToDell)}>Видалити</button>
        </div>
    );
};

export default ImageComponent;