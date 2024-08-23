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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "@/src/data/types";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

  const fetchData = async () => {
    const query = new URLSearchParams({
      range: JSON.stringify({
        from: page * rowsPerPage,
        to: (page + 1) * rowsPerPage - 1,
      }),
      filter: JSON.stringify({ q: filterText }),
      sort: JSON.stringify({ field: sortField, order: sortOrder }),
    }).toString();

    const resp = await fetch(`/api/users?${query}`, {
      method: "GET",
    });
    if (resp.ok) {
      const result = await resp.json();
      setData(result.data);
      setTotal(result.total);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, sortField, sortOrder, filterText]);

  // Handle sort
  const handleSort = (field: keyof User) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const HandleDelete = async (id: string) => {
    const resp = await fetch("/api/users", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (resp.ok) {
      const data = await resp.json();
      setData(data.data);
      setTotal(data.total);
    }
  };

  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <h1>Static page</h1>
      <p>
        Constructed with prisma on vercel posgressSql database. It shows that
        the route for this page does not conflict with react admin routes. You
        can filter, sort, change pagination.
      </p>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <TextField
          label="Filter by name"
          variant="outlined"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ marginBottom: "20px", marginTop: "20px" }}
          InputLabelProps={{
            sx: {
              color: "#518eb9",
              fontSize: "14px",
              fontWeight: 20,
              "&.MuiOutlinedInput-notchedOutline": { fontSize: "14px" },
            },
          }}
        />
        <Link href="/static/add-user">Add User</Link>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ display: { xs: "none", sm: "table-cell" } }}
                onClick={() => handleSort("name")}
              >
                Name
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("username")}>
                Username
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("email")}>
                Email
              </StyledTableCell>
              <StyledTableCell
                sx={{ display: { xs: "none", sm: "table-cell" } }}
                onClick={() => handleSort("phone")}
              >
                Phone
              </StyledTableCell>
              <StyledTableCell
                sx={{ display: { xs: "none", sm: "table-cell" } }}
                onClick={() => handleSort("website")}
              >
                Website
              </StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
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
                    onClick={() => router.push(`/static/${user.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => HandleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
        sx={{
          "& .MuiSelect-select, .MuiTablePagination-selectLabel": {
            display: { xs: "none", sm: "none", lg: "block" },
          },
          "& > div.MuiToolbar-root > div.MuiInputBase-root > svg": {
            display: { xs: "none", sm: "none", lg: "block" },
          },
        }}
      />
    </Container>
  );
};

export default Page;
