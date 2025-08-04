import { styled, TableCell, tableCellClasses, TableRow } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bold',
    fontFamily: '"Nunito", sans-serif',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '10px 14px',
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#dfdfdf', // чергування рядків

  },
  '&:nth-of-type(even)': {
    backgroundColor: '#dfdfdf',
  },
  '&:hover': {
    backgroundColor: '#f4f0f0', // наводимо і фон дає
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },
}));


export {StyledTableRow, StyledTableCell}