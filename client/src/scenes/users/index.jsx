import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUsersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DataGridCustomToolbar from "components/CustomToolbar";

const Users = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // values to send for the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, isSuccess } = useGetUsersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  if (isSuccess) console.log(data.users);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "firstName",
      flex: 0.25,
    },
    {
      field: "lastName",
      headerName: "lastName",
      flex: 0.25,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "affiliation",
      headerName: "Affiliation",
      flex: 0.5,
    },
    {
      field: "level",
      headerName: "Level",
      flex: 0.25,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Users" subtitle="List of All users" />
      <Box
        mt="40px"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.users) || []}
          columns={columns}
          onCellClick={(data) => navigate(`/profile/${data.id}`)}
          rowCount={(data && data.users.length) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Users;
