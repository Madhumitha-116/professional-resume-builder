import { useState } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import Form from "./components/Form";
import Preview from "./components/Preview";

function App() {
  const [theme, setTheme] = useState("blue"); // default theme

  const [data, setData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",
    skills: [],
    experience: [],
    projects: [],
    education: "",
    certifications: "",
    languages: ""
  });

  const bg = {
    light: "#f4f6f8",
    blue: "linear-gradient(120deg,#e3f2fd,#ffffff)"
  };

  const textColor = {
    light: "#000",
    blue: "#000"
  };

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: bg[theme],
        color: textColor[theme],
        p: 3,
      }}
    >
      {/* TITLE */}
      <Typography variant="h4" align="center" fontWeight="bold" mb={2}>
        Professional Resume Builder
      </Typography>

      {/* THEME SELECTOR */}
      <Stack direction="row" justifyContent="center" mb={3}>
        <ToggleButtonGroup
          value={theme}
          exclusive
          onChange={(e, v) => v && setTheme(v)}
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="blue">Blue</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* MAIN GRID */}
      <Box
        maxWidth="1200px"
        mx="auto"
        display="grid"
        gridTemplateColumns={{ md: "1fr 1.5fr" }} // Right grid wider
        gap={3}
      >
        <Form data={data} setData={setData} theme={theme} />
        <Preview data={data} theme={theme} />
      </Box>
    </Box>
  );
}

export default App;
