import React, {FC, useEffect} from 'react';
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ITagUpdateModel } from 'src/models/ITagUpdateModel';
import {tagsApiService} from "../../services/tags.api.service";
import style from "../../styles/commonForm.module.css";
import {baseUrls} from "../../costants/Urls";

const UpdateTagComponent: FC<{tagId: string}> = ({tagId}) => {
    console.log(`const {handleSubmit`)
    const {handleSubmit, register, reset } = useForm<ITagUpdateModel>()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchTag = async () => {
            try {
               const existingTag = await tagsApiService.getById(tagId);
               reset({
                   name: existingTag.name
               })
            } catch (error) {
                console.error('Failed to load tag:', error);
            }
        }
        fetchTag()
    }, [tagId, reset]);



const updateTag = async (formData: ITagUpdateModel) => {
    try {
        await tagsApiService.updateById(tagId, formData);
        reset()
        navigate(`/${baseUrls.adminDashboard}/${baseUrls.adminTags}`);
    } catch (error: any) {
        console.error('update tag failed:', error?.response?.data || error);
        throw error
    }
}

    return (
        <div className={style.wrap}>
            <form onSubmit={handleSubmit(updateTag)} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input type="text" placeholder='name' {...register('name')} style={{ width: '300px', height: '50px' }}/>
            <button type='submit'>Update</button>
            </form>
        </div>
    );
};
export default UpdateTagComponent;