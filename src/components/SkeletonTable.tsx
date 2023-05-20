// Done

import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

// Зебра
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }
}));
// Зебра

function SkeletonTable(props: number) {
    return (
        <Box sx={{ width: 767, margin: 'auto' }}>
            <Paper sx={{ mb: 2, overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 660 }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        aria-labelledby="tableTitle"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ width: 90 }} align="left">ID</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell sx={{ paddingRight: '16px' }} align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(props.rowsPerPage)].map((_, index: number) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell sx={{ width: 90 }}>
                                        <Skeleton animation="wave" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton animation="wave" />
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ width: 100, paddingRight: '16px' }}>
                                        <Skeleton animation="wave" />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper >
        </Box >
    );
}

export default SkeletonTable;
