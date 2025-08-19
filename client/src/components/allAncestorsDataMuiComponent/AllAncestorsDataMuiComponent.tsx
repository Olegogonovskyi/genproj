import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { apiUrls } from '../../costants/Urls';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../styleHelpers/StyledTable';

const AllAncestorsDataMuiComponent: FC = () => {
  const {data} = useAppSelector(state => state.ancestorsDateReducer)
  const navigate = useNavigate()
  return (
        <div>
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'visible' }}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Дата</StyledTableCell>
                  <StyledTableCell align="center">Тип</StyledTableCell>
                  <StyledTableCell align="center">Місце</StyledTableCell>
                  <StyledTableCell align="center">Дійові Особи</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data.map((dateEvent) => (

                  <StyledTableRow
                    key={dateEvent.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {dateEvent.date}</StyledTableCell>
                    <StyledTableCell align="center">{dateEvent.type}</StyledTableCell>
                    <StyledTableCell align="center">{dateEvent.place}</StyledTableCell>
                    <StyledTableCell align="center">
                      {
                        dateEvent.personEvent.length > 0 ? (
                          <>
                            <div onClick={() => {
                              navigate(apiUrls.ancestors.getAncestorById(dateEvent.personEvent[0].id))
                            }}>{dateEvent.personEvent[0]?.name ?? ''}</div>
                            <div>{dateEvent.personEvent[0]?.surName ?? ''}</div>
                          </>
                        ) : (
                          <>
                            {dateEvent.familyPersons?.[0]?.parents?.map((parent) => (
                              <div key={parent.id} onClick={() => {
                                navigate(apiUrls.ancestors.getAncestorById(parent.id))
                              }}>
                                {parent.name} {parent.surName} {parent.marriedSurName}
                              </div>
                            ))}
                          </>
                        )
                      }
                    </StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
  );
};

export default AllAncestorsDataMuiComponent;