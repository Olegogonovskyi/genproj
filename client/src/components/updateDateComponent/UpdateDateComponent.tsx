import React, { FC, useEffect } from 'react';
import { IDateCreateModel } from '../../models/iDateCreateModel';
import { useForm } from 'react-hook-form';
import { ChronologyApiService } from '../../services/chronology.api.service';

const UpdateDateComponent: FC<{dateToUpdateId: string}> = ({dateToUpdateId}) => {
  const {handleSubmit, register, reset } = useForm<IDateCreateModel>()
console.log('UpdateDateComponent')
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const existingDate = await ChronologyApiService.getDateById(dateToUpdateId);
        reset({
          year: existingDate.year,
          description: existingDate.description,
        }); // заповнює форму
      } catch (err) {
        console.error('Failed to load date:', err);
      }
    };

    fetchDate();
  }, [dateToUpdateId, reset]);

  const updateDateData = async (formData: IDateCreateModel)=> {
    try {
      await ChronologyApiService.updateDateById(dateToUpdateId, formData)
      reset()
            } catch (error: any) {
      console.error('update date failed:', error?.response?.data || error);
      throw error
            }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(updateDateData)} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input type="number" placeholder="Year" {...register('year')} />
        <input type="text" placeholder="Description" {...register('description')} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateDateComponent;