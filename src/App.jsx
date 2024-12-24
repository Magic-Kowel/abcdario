import Grid from "@mui/material/Grid2";
import {
  Box,
  Chip,
  Button,
  Typography,
  TextField,
  LinearProgress,
} from "@mui/material";
import Footer from "./componets/Footer";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const abecedario = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function App() {
  const [play, setPlay] = useState(false);
  const [space, setSpace] = useState(0);
  const [letter, setLetter] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice actual

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", margin: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    );
  }
  const increaseProgress = () => {
    setCurrentIndex((prev) =>
      prev < abecedario.length ? prev + 1 : abecedario.length
    );
  };
  useEffect(() => {
    const progressPercentage = (currentIndex / abecedario.length) * 100;
    setProgress(progressPercentage);
    increaseProgress();
  }, [space]);
  const validateNextLetter = () => {
    setPlay(true);
    if (letter.toLowerCase() === abecedario[space + 1]) {
      if (space === abecedario.length - 2) {
        Swal.fire({
          icon: "success",
          title: "win",
        });
        setSpace(0);
        setLetter("");
        setCurrentIndex(0);
        setPlay(false);
        return;
      }
      setSpace(space + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "the next is " + abecedario[space + 1],
      });
      setCurrentIndex(0);
      setPlay(false);
      setSpace(0);
    }

    setLetter("");
  };
  return (
    <>
      {!play && (
        <Grid
          container
          display="flex"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Box>
              {abecedario.map((item) => (
                <>
                  <Chip key={item} label={item} color="primary" />
                </>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <LinearProgressWithLabel value={progress} />
        </Grid>

        <Grid
          container
          display="flex"
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          xs={12}
        >
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              {abecedario[space]}
            </Typography>
          </Grid>
          <Grid item my={2} xs={12}>
            <TextField
              fullWidth
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  validateNextLetter();
                }
              }}
              label="Next letter"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item xs={8}>
          <Button
            mt={2}
            placeholder="Ingresa una letra"
            onClick={validateNextLetter}
            fullWidth
            variant="contained"
          >
            {play ? "Next" : "Play"}
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default App;
