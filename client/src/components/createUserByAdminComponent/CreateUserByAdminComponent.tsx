import React, {FC} from 'react';
import { useForm } from 'react-hook-form';
import { IAdminCreateUserModel } from '../../models/IAdminCreateUserModel';
import { usersApiService } from '../../services/users.api.service';

const CreateUserByAdminComponent: FC = () => {
  const {handleSubmit, register, reset } = useForm<IAdminCreateUserModel>()

  const createUserForm = async (newUser: IAdminCreateUserModel) => {
    try {
                await usersApiService.createByAdmin(newUser)
      reset();
            } catch (error: any) {
      console.log(`error when post new user by Admin ${error?.response?.data?.message || error.message}`);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(createUserForm)}>
        <input type={'text'}  placeholder={'name '} {...register('name', { required: 'Please write name' })} style={{ width: '300px', height: '50px' }} />
        <input type={'email'}  placeholder={'email '} {...register('email', { required: 'Please write email' })} style={{ width: '300px', height: '50px' }} />
        <input type={'password'}  placeholder={'password '} {...register('password', { required: 'Please write password' })} style={{ width: '300px', height: '50px' }} />
        <select {...register('role', { required: 'Please select a role' })} style={{ width: '300px', height: '50px' }}>
          <option value="">Select role</option>
          <option value="reader">Reader</option>
          <option value="admin">Admin</option>
          <option value="writter">Writter</option>
        </select>

        <button type="submit" > create User </button>
      </form>
    </div>
  );
};

export default CreateUserByAdminComponent;