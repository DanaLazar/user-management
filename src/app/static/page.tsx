"use client";

import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Container,
  tableCellClasses,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "@/src/data/types";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Page: NextPage = () => {
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<keyof User>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeEditId, setActiveEditId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      range: JSON.stringify({
        from: page * rowsPerPage,
        to: (page + 1) * rowsPerPage - 1,
      }),
      filter: JSON.stringify({ q: filterText }),
      sort: JSON.stringify({ field: sortField, order: sortOrder }),
    }).toString();

    try {
      const resp = await fetch(`/api/users?${query}`, {
        method: "GET",
      });
      if (resp.ok) {
        const result = await resp.json();
        setData(result.data);
        setTotal(result.total);
      } else {
        setError("Failed to fetch data.");
      }
    } catch (e) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, sortField, sortOrder, filterText]);

  const handleSort = (field: keyof User) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/users", {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      });
      if (resp.ok) {
        await fetchData();
      } else {
        setError("Failed to delete user.");
      }
    } catch (e) {
      setError("An error occurred while deleting the user.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    setActiveEditId(id);
    setError(null);
    try {
      router.push(`/static/${id}`);
    } catch (e) {
      setError("An error occurred while navigating to the edit page.");
    } finally {
      setActiveEditId(null);
    }
  };

  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <h1>Static Page</h1>
        <p>
          Constructed with Prisma on Vercel PostgreSQL database. It shows that
          the route for this page does not conflict with React Admin routes. You
          can filter, sort, and change pagination.
        </p>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          label="Filter by name"
          variant="outlined"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ flex: 1, mr: 2 }}
          InputLabelProps={{
            sx: {
              color: "#518eb9",
              fontSize: "14px",
              fontWeight: 20,
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/static/add-user"
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ cursor: "pointer" }}
                onClick={() => handleSort("name")}
              >
                Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ cursor: "pointer" }}
                onClick={() => handleSort("username")}
              >
                Username
              </StyledTableCell>
              <StyledTableCell
                sx={{ cursor: "pointer" }}
                onClick={() => handleSort("email")}
              >
                Email
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  cursor: "pointer",
                  display: { xs: "none", sm: "table-cell" },
                }}
                onClick={() => handleSort("phone")}
              >
                Phone
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  cursor: "pointer",
                  display: { xs: "none", sm: "table-cell" },
                }}
                onClick={() => handleSort("website")}
              >
                Website
              </StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {user.name}
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {user.phone}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {user.website}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      sx={{ color: "primary.main", mr: 1 }}
                      onClick={() => handleEdit(user.id)}
                      disabled={activeEditId === user.id}
                    >
                      {activeEditId === user.id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <EditIcon />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      sx={{ color: "primary.main", mr: 1 }}
                      onClick={() => handleDelete(user.id)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
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
        sx={{
          "& .MuiSelect-select, .MuiTablePagination-selectLabel": {
            display: { xs: "none", sm: "none", lg: "block" },
          },
          "& > div.MuiToolbar-root > div.MuiInputBase-root > svg": {
            display: { xs: "none", sm: "none", lg: "block" },
          },
        }}
      />

      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Page;
