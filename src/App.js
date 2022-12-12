import React, { createContext, useMemo, useState } from "react";
import AppRouter from "./router/AppRouter";
import { Outlet } from "react-router";
import { Container } from "@mui/system";
import { darkTheme, theme } from "./context/customtheme";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import {AppContext} from "./context/AppContext"

function App() {
  const [user,setId]=useState({id:null})

  const mode='dark'
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <AppContext.Provider value={{user,setId}}>
      <Container
      maxWidth="100%"
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
    </AppContext.Provider>
  );
}

export default App;
