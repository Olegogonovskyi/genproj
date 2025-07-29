import React, {FC} from 'react';
import {useAppSelector} from "../../redux/store";
import {useNavigate} from "react-router-dom";
import {Paper, Table, TableBody, TableContainer, TableHead} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../../styleHelpers/StyledTable";
import {apiUrls, baseUrls} from "../../costants/Urls";
import {tagsApiService} from "../../services/tags.api.service";

const TagsAdminListComponent: FC = () => {
    const {data} = useAppSelector(state => state.tagsReducer)
    const navigate = useNavigate()
    return (
        <div>
            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'visible' }}>
                <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Пошта</StyledTableCell>
                            <StyledTableCell align="center">Назва</StyledTableCell>
                            <StyledTableCell align="center">ID</StyledTableCell>
                            <StyledTableCell align="center">Кількість статей</StyledTableCell>
                            <StyledTableCell align="center">Статті</StyledTableCell>
                            <StyledTableCell align="center">Редагувати</StyledTableCell>
                            <StyledTableCell align="center">Видалити</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((oneTag) => (
                            <StyledTableRow
                                key={oneTag.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell>{oneTag.name}</StyledTableCell>
                                <StyledTableCell align="center">{oneTag.id}</StyledTableCell>
                                <StyledTableCell align="center">{oneTag.articleCount}</StyledTableCell>
                                <StyledTableCell align="center">{oneTag.articles.map(article => (
                                    <p onClick={() => {navigate(apiUrls.article.getById(article.id))}}>{article.title}</p>
                                ))}</StyledTableCell>
                                <StyledTableCell onClick={()=> {
                                    navigate(`update/${oneTag.id}`)
                                }} component="th" scope="row" align="center">Редагувати</StyledTableCell>
                                <StyledTableCell onClick={ async ()=> {
                                    await tagsApiService.deleteTag(oneTag.id);
                                    navigate(baseUrls.adminTags);
                                }} component="th" scope="row" align="center">Видалити</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TagsAdminListComponent;