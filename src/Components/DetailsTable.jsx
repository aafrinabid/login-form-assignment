import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function DetailsTable({rows}) {
    const sessionId=useSelector(state=>state.authHandler.sessionId)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 ,textAlign:'center'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center' >Login Time</TableCell>
            <TableCell align="center">Session Time <br /> (in minutes)</TableCell>
            <TableCell align="center">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.session_id}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                           <TableCell align="center">{ row.login_time}</TableCell>

              <TableCell align="center">{row.session_id===sessionId? 'Current Session Going On':row.session_time==0?'less than one minute':row.session_time}</TableCell>
              <TableCell align="center">{row.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
