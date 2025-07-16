import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IImageModel } from '../../models/IImageModel';
import { UploadFotoApiService } from '../../services/uploadFoto.api.service';
import style from './UploadFotoComponent.module.css';

const UploadFotoComponent: FC = () => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
    }, [imageUrl]);

    const satFormData = async (sendImageData: IImageModel) => {
        try {
            const formData = new FormData();
            formData.append('name', sendImageData.name);

            Array.from(sendImageData.articleImage).forEach((file) => {
                formData.append('articleImage', file);
            });
console.log(`formData ${formData}`);
            const responseUrl = await UploadFotoApiService.uploadFoto(formData);
            console.log(responseUrl);
            setImageUrl(responseUrl);
        } catch (e) {
            console.error(' Помилка під час завантаження зображення:', e);
        }
    };

    const {
        register,
        handleSubmit,
    } = useForm<IImageModel>();

    return (
        <div className={style.wrap}>
            <form onSubmit={handleSubmit(satFormData)}>
                <input type="text" {...register('name')} placeholder="Назва зображення" />
                <input type="file"{...register('articleImage', { required: 'Зображення є обовʼязковим' })}
                />
                <button type="submit">Завантажити</button>
            </form>

            {imageUrl && (
                <div>
                    <p>URL зображення:</p>
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                        {imageUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default UploadFotoComponent;
