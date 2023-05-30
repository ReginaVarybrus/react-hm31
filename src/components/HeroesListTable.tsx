import * as React from "react";
import { FC } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { IArrayHeroes } from "../store/slices/heroSlices";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));
// Зебра

// Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
// Dialog

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

interface IPropsTable {
  data: IArrayHeroes[];
  count: number;
  rowsPerPage: number;
  page: number;
  handleClickOpen: () => void;
  handleClose: () => void;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}

const EnhancedTable: FC<IPropsTable> = (props: IPropsTable) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedHero, setSelectedHero] = React.useState<IArrayHeroes | null>(
    null
  );

  const handleClickOpen = (id: number) => {
    const hero = props.data.find((item) => item.id === id);
    console.log("hero", hero);
    setSelectedHero(hero as IArrayHeroes);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 660 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ width: 90 }} align="left">
                    ID
                  </StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((row) => (
                  <>
                    <StyledTableRow
                      hover
                      role="checkbox"
                      key={`row-key${row.id}`}
                      onClick={() => handleClickOpen(row.id)}
                    >
                      <StyledTableCell
                        sx={{ width: 90 }}
                        component="th"
                        scope="row"
                      >
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.status}
                      </StyledTableCell>
                    </StyledTableRow>

                    <BootstrapDialog
                      key={`hero-key${selectedHero?.id}`}
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
                      <BootstrapDialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                      >
                        {selectedHero?.name}
                      </BootstrapDialogTitle>
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          {selectedHero?.status}
                        </Typography>
                        <Typography gutterBottom>
                          {selectedHero?.species}
                        </Typography>
                        <Box>
                          <img alt="hero-img" src={selectedHero?.image}></img>
                        </Box>
                      </DialogContent>
                    </BootstrapDialog>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={props.count}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onPageChange={props.onPageChange}
          />
        </Paper>
      </Box>
    </>
  );
};

export default EnhancedTable;
