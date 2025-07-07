import React from 'react';
import { storageService } from '@/utils/storage';
import { useGetShareholdersQuery } from '@/services/shareholder';
import { Box, Typography, CircularProgress, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const ShareholdersPage = () => {
  const userDetails = storageService.getUserDetails();
  const brokerId = userDetails?.brokerId;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, isLoading, error } = useGetShareholdersQuery(
    { brokerId: brokerId || '', page: page + 1, limit: rowsPerPage },
    { skip: !brokerId }
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const shareholders = data?.data?.data?.data ?? [];
  const total = data?.data?.data?.total ?? 0;

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Shareholders
      </Typography>
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error">Failed to load shareholders.</Alert>
      )}
      {!isLoading && !error && Array.isArray(shareholders) && shareholders.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>CUSIP</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Number of Shares</TableCell>
                  <TableCell>Record Date</TableCell>
                  {/* <TableCell>Created At</TableCell> */}
                  {/* <TableCell>Updated At</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {shareholders.map((shareholder) => (
                  <TableRow key={shareholder.id}>
                    {/* <TableCell>{shareholder.id}</TableCell> */}
                    <TableCell>{shareholder.firstName}</TableCell>
                    <TableCell>{shareholder.lastName}</TableCell>
                    <TableCell>{shareholder.email || '-'}</TableCell>
                    <TableCell>{shareholder.cusip}</TableCell>
                    <TableCell>{shareholder.accountNumber}</TableCell>
                    <TableCell>{shareholder.numberOfShares}</TableCell>
                    <TableCell>{shareholder.recordDate ? new Date(shareholder.recordDate).toLocaleDateString() : '-'}</TableCell>
                    {/* <TableCell>{shareholder.createdAt ? new Date(shareholder.createdAt).toLocaleString() : '-'}</TableCell> */}
                    {/* <TableCell>{shareholder.updatedAt ? new Date(shareholder.updatedAt).toLocaleString() : '-'}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </>
      )}
      {!isLoading && !error && (!Array.isArray(shareholders) || shareholders.length === 0) && (
        <Alert severity="info">No shareholders found.</Alert>
      )}
    </Box>
  );
};

export default ShareholdersPage; 