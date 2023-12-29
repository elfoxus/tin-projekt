import React, {useContext, useEffect, useState} from "react";
import Section from "../Section/Section";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import {login} from "../../services/authUtils";
import {UserContext} from "../../services/auth";

const Login = () => {

    const {dispatch} = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [invalidFields, setInvalidFields] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setInvalidFields(false)
        if (event.target.value.length > 0 && password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setInvalidFields(false)
        if (event.target.value.length > 0 && username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        login(data.get('username'), data.get('password'))
            .then(userData => {
                setLoading(false);
                dispatch({type: 'set', payload: userData});
            }).catch(error => {
                setLoading(false);
                setInvalidFields(true);
                console.log(error.response.data)
            })
    };

    return (
        <Section >
            <Container maxWidth="xs"
                       sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           width: '100%'
                       }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zaloguj się
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={invalidFields}
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Nazwa użytkownika"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleUsernameChange}
                    />
                    <FormControl sx={{ marginTop: 2, marginBottom: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="password">Hasło</InputLabel>
                        <OutlinedInput
                            error={invalidFields}
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            label="Hasło"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end">
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={buttonDisabled || loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Zaloguj się
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Button>
                </Box>
            </Container>
        </Section>
    )
}

export default Login;