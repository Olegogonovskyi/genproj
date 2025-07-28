import React, { FC } from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { baseUrls} from '../../costants/Urls';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../styleHelpers/StyledTable';
import {usersApiService} from "../../services/users.api.service";
import {useAppSelector} from "../../redux/store";

const UserAdminDetailComponent: FC = () => {
    const {data} = useAppSelector(state => state.usersReducer)
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
                        {data.map((user) => (
                            <StyledTableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell onClick={()=> {
                                    navigate(`${baseUrls.adminUsers}/${user.id}`)
                                }} component="th" scope="row">
                                    {user.email}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.name}</StyledTableCell>
                                <StyledTableCell align="center">{user.id}</StyledTableCell>
                                <StyledTableCell align="center">{user.role}</StyledTableCell>
                                <StyledTableCell align="center">{user.isVerified}</StyledTableCell>
                                <StyledTableCell onClick={()=> {
                                    navigate(`update/${user.id}`)
                                }} component="th" scope="row" align="center">Редагувати</StyledTableCell>
                                <StyledTableCell onClick={ async ()=> {
                                    await usersApiService.deleteUser(user.id);
                                    navigate(baseUrls.adminUsers);
                                }} component="th" scope="row" align="center">Видалити</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserAdminDetailComponent;