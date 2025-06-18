import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { apiUrls } from '../../costants/Urls';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../styleHelpers/StyledTable';

const AllAncestorsMuiComponent: FC = () => {
  const {data} = useAppSelector(state => state.ancestorsReducer)
  const navigate = useNavigate()
  return (

        <div>
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'visible' }}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Ім'я</StyledTableCell>
                  <StyledTableCell align="center">Прізвище</StyledTableCell>
                  <StyledTableCell align="center">Прізвище після одруження
                  </StyledTableCell>
                  <StyledTableCell align="center">Звернення</StyledTableCell>
                  <StyledTableCell align="center">Батьки</StyledTableCell>
                  <StyledTableCell align="center">Стать</StyledTableCell>
                  <StyledTableCell align="center">Дата народження</StyledTableCell>
                  <StyledTableCell align="center">Місце народження</StyledTableCell>
                  <StyledTableCell align="center">Дата одруження</StyledTableCell>
                  <StyledTableCell align="center">Місце одруження</StyledTableCell>
                  <StyledTableCell align="center">Дата смерті</StyledTableCell>
                  <StyledTableCell align="center">Місце смерті</StyledTableCell>
                  <StyledTableCell align="center">Примітки</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data.map((ancestor) => (

                  <StyledTableRow
                    key={ancestor.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell onClick={()=> {
                      navigate(apiUrls.ancestors.getAncestorById(ancestor.id))
                    }} component="th" scope="row">
                      {ancestor.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{ancestor.surName}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.marriedSurName}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.npfx}</StyledTableCell>
                    <StyledTableCell align="center">
                      {ancestor.familyAsChild?.[0]?.parents?.[0] &&
                        (<div onClick={()=> {navigate(apiUrls.ancestors.getAncestorById(ancestor.familyAsChild?.[0]?.parents?.[0].id))}}>{ancestor.familyAsChild?.[0]?.parents?.[0].name} {ancestor.familyAsChild?.[0]?.parents?.[0].surName}</div>)}
                      {ancestor.familyAsChild?.[0]?.parents?.[1] &&
                        (<div onClick={()=> {navigate(apiUrls.ancestors.getAncestorById(ancestor.familyAsChild?.[0]?.parents?.[1].id))}}>{ancestor.familyAsChild?.[0]?.parents?.[1].name} {ancestor.familyAsChild?.[0]?.parents?.[1].surName}</div>)}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.sex}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.birthDateandPlace?.date}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.birthDateandPlace?.place}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.familyAsParent?.map((f, i) => (
                      <div key={i}>{f.dateOfMarry?.date}</div>
                    ))}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.familyAsParent?.map((f, i) => (
                      <div key={i}>{f.dateOfMarry?.place}</div>
                    ))}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.deathDateandPlace?.date}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.deathDateandPlace?.place}</StyledTableCell>
                    <StyledTableCell align="center">{ancestor.note}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
  );
};

export default AllAncestorsMuiComponent;