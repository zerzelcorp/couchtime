import { createTheme } from "@mui/system";
import { white,black,green,grey,purple,red,orange,blue} from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: grey.A100,
    },
    secondary: {
      main: grey.A400,
      light:grey.A200,
      dark:grey[700]
    },
    dark: {
      main: grey[900],
      light: grey[800]
    },
    info: {
      main: blue[500],
    },
    success: {
      main: green[500],
      light: green[300],
      dark: green[700],
    },
    warning: {
      main: orange[500],
    },
    danger: {
      main: red[500],
    },
  },
});

export const darkTheme = createTheme({
    palette: {
       mode:'dark'
    }
  });
  