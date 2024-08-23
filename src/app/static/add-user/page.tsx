import AddUserForm from "./components/AddUserForm"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Container, tableCellClasses} from '@mui/material';


const AddUserPage = () => {
  return (
    <Container>
        <Paper sx={{ p: 5, mt: 5 }}>
            <h2>Add user</h2>
            <AddUserForm />
        </Paper>
    </Container>
  )
}

export default AddUserPage;
