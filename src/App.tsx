import { Container } from "@mui/material";
import Countries from "./components/Countries/Countries";

function App() {
  return (
    <Container maxWidth="md">
      <h1>Countries App</h1>

      <Countries />
    </Container>
  );
}

export default App;
