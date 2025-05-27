import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usersApiService } from '../../services/users.api.service';
import { IAdminUpdateUserModel } from '../../models/IAdminUpdateUserModel';

const UpdateUserComponent: FC<{userUpdateId: string}> = ({userUpdateId}) => {
  const {handleSubmit, register, reset } = useForm<IAdminUpdateUserModel>()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const existingUser = await usersApiService.getUserById(userUpdateId);
        reset({
          name: existingUser.name,
          role: existingUser.role,
        }); // повинно б форму заповнити
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    };

    fetchUser();
  }, [userUpdateId, reset]);

  const updateUsereData = async (formData: IAdminUpdateUserModel)=> {
    try {
      await usersApiService.updateUser(userUpdateId, formData)
      reset()
            } catch (error: any) {
      console.error('update user failed:', error?.response?.data || error);
      throw error
            }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(updateUsereData)} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select {...register('role')} style={{ width: '300px', height: '50px' }}>
          <option value="">Select role</option>
          <option value="reader">Reader</option>
          <option value="admin">Admin</option>
          <option value="writter">Writter</option>
        </select>
        <input type="text" placeholder="name" {...register('name')} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserComponent;