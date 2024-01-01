import React, {forwardRef, Fragment, useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {useTheme} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ClickableImage = ({image, name}) => {

    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const openImage = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Fragment>
            <Box component="img" sx={{width: '100%', height: '300px', objectFit: 'cover', borderRadius: 1, cursor: 'pointer'}} alt={name} src={"http://localhost:3001/" + image} onClick={openImage}/>
            <Dialog open={open} onClose={handleClose} fullScreen={true} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box component="img"
                         sx={{
                             maxWidth: {
                                 lg: theme.breakpoints.values['lg'],
                                 md: theme.breakpoints.values['md'],
                                 sm: theme.breakpoints.values['sm'],
                                 xs: '80%',
                             }
                         }}
                         alt={name}
                         src={"http://localhost:3001/" + image}
                         onClick={handleClose} />
                </Box>
            </Dialog>
        </Fragment>

    )
}

export default ClickableImage;