import { createTheme } from "@mui/material";
import { palette } from "@mui/system";

const theme = createTheme({
    // palette: {
    //     primary: {
    //         main: '#071B26',
    //     }
    // }
    palette: palette // redundant, it is used by default when overriding the theme, but it is here for clarity
});

export default theme;