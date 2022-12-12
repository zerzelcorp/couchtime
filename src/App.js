import React, { useMemo } from "react";
import AppRouter from "./router/AppRouter";
import { Outlet } from "react-router";
import { Container } from "@mui/system";
import { darkTheme, theme } from "./context/customtheme";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";


function App() {
  const mode='dark'
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    // <ThemeProvider theme={darkTheme}>

    // </ThemeProvider>
    <Container
      maxWidth="l"
      md={{ border: 1, mt: 2, mb: 2 }}
    >
      <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppRouter>
          <Outlet />
        </AppRouter>
        </CssBaseline>
      </ThemeProvider>
    </Container>
  );
}

export default App;
