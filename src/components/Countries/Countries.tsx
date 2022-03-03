import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Alert,
  Button,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import TableLayout from "./TableLayout";
import CardLayout from "./CardLayout";
import useCountries from "../../hooks/useCountries";

type Layout = "table" | "card";

const Countries = () => {
  const { loading, error, data, refetch } = useCountries();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [layout, setLayout] = useState<Layout>("table");

  const displayData = data?.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    if (displayData && displayData.length < 1) {
      setPage(1);
    }
  }, [displayData]);

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Alert severity="error">
        There was an issue loading the country list.
      </Alert>
    );

  return (
    <Stack
      spacing={2}
      sx={{
        marginBottom: "2rem",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <FormControl
          variant="outlined"
          sx={{
            width: "150px",
          }}
        >
          <InputLabel id="rows-per-page-input">Rows per page</InputLabel>
          <Select
            labelId="rows-per-page-input"
            id="demo-simple-select"
            value={rowsPerPage}
            label="Rows per page"
            onChange={(event) =>
              setRowsPerPage(parseInt(event.target.value as string, 10))
            }
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <ToggleButtonGroup
            color="primary"
            value={layout}
            exclusive
            onChange={(_, newLayout) => setLayout(newLayout)}
            sx={{
              marginRight: "0",
            }}
          >
            <ToggleButton value="table">Table</ToggleButton>
            <ToggleButton value="card">Card</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        <Button
          variant="contained"
          endIcon={<ReplayIcon />}
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      </Stack>

      {displayData && displayData.length === 0 && (
        <Alert severity="info">No countries</Alert>
      )}

      {displayData && layout === "table" && (
        <TableLayout countries={displayData} />
      )}
      {displayData && layout === "card" && (
        <CardLayout countries={displayData} />
      )}

      {data && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          count={Math.ceil(data?.length / rowsPerPage)}
          onChange={(_, value) => {
            window.scrollTo(0, 0);
            setPage(value);
          }}
        />
      )}
    </Stack>
  );
};

export default Countries;
