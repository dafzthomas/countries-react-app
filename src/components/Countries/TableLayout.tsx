import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";
import { Country } from "../../hooks/useCountries";

const TableLayout = ({ countries }: { countries: Country[] }) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Code</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Emoji</TableCell>
          <TableCell>Native</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Capital</TableCell>
          <TableCell>Currency</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {countries.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.code}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.emoji}</TableCell>
            <TableCell>{row.native}</TableCell>
            <TableCell>+{row.phone}</TableCell>
            <TableCell>{row.capital}</TableCell>
            <TableCell>
              {getSymbolFromCurrency(row.currency) ?? row.currency}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TableLayout;
