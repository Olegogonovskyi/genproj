import React, { FC } from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import {apiUrls, baseUrls} from '../../costants/Urls';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../styleHelpers/StyledTable';
import {IUserModel} from "../../models/IUserModel";
import {usersApiService} from "../../services/users.api.service";

const UserAdminDetailComponent: FC<{User: IUserModel}> = ({User}) => {
    const {name, role, isVerified, id, email} = User
    const navigate = useNavigate()
    return (

        <div>
            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'visible' }}>
                <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Пошта</StyledTableCell>
                            <StyledTableCell align="center">Ім'я</StyledTableCell>
                            <StyledTableCell align="center">ID</StyledTableCell>
                            <StyledTableCell align="center">Роль</StyledTableCell>
                            <StyledTableCell align="center">Чи верифікований</StyledTableCell>
                            <StyledTableCell align="center">Редагувати</StyledTableCell>
                            <StyledTableCell align="center">Видалити</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <StyledTableCell onClick={()=> {
                                navigate(`${baseUrls.adminUsers}/${id}`)
                            }} component="th" scope="row">
                                {email}
                            </StyledTableCell>
                            <StyledTableCell align="center">{name}</StyledTableCell>
                            <StyledTableCell align="center">{id}</StyledTableCell>
                            <StyledTableCell align="center">{role}</StyledTableCell>
                            <StyledTableCell align="center">{isVerified}</StyledTableCell>
                            <StyledTableCell onClick={()=> {
                                navigate(`${apiUrls.users.update}/${id}`)
                            }} component="th" scope="row" align="center">Редагувати</StyledTableCell>
                            <StyledTableCell onClick={ async ()=> {
                                await usersApiService.deleteUser(id);
                            }} component="th" scope="row" align="center">Видалити</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserAdminDetailComponent;