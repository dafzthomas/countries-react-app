import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Country } from "../../hooks/useCountries";
import CurrencySymbol from "../CurrencySymbol";

const CardLayout = ({ countries }: { countries: Country[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined
  );

  return (
    <Grid container>
      {countries.map((row) => (
        <Grid
          item
          key={row.name}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            padding: 1,
          }}
        >
          <Card>
            <CardActionArea
              onClick={() => {
                setSelectedCountry(row);
                setModalOpen(true);
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={row.image}
                alt={`Random image from Unsplash API for ${row.name}`}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {row.emoji}
                  {row.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      <Modal
        open={modalOpen}
        onClose={() => {
          setSelectedCountry(undefined);
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "80vh",
            maxWidth: "80vw",
            overflowY: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedCountry && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedCountry.emoji}
                {selectedCountry.name}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Capital City: {selectedCountry.capital || "Unknown"}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Currency: <CurrencySymbol country={selectedCountry} />
              </Typography>
              <Typography sx={{ mt: 1 }}>
                International phone prefix: +{selectedCountry.phone}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Grid>
  );
};

export default CardLayout;
