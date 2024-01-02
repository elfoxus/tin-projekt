import React, { useState } from "react";
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import api from "../../services/api";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const Registration = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [invalidFields, setInvalidFields] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const dataToSend = {
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email')
        }
        api.post('/register', dataToSend)
            .then(response => {
                setLoading(false);
                navigate('/thank-you')
            })
            .catch(error => {
                setLoading(false);
                const invalidFields = error.response.data.invalidFields;
                if (invalidFields && invalidFields.length > 0) {
                    setInvalidFields(invalidFields);
                    setButtonDisabled(true)
                }
                console.log(error.response.data)
            });
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        let newInvalidFields = invalidFields.filter(field => field !== 'username');
        setInvalidFields(newInvalidFields);
        var enabled = event.target.value.length > 0
            && password.length > 0
            && email.length > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        let newInvalidFields = invalidFields.filter(field => field !== 'password');
        setInvalidFields(newInvalidFields);
        var enabled = event.target.value.length > 0
            && username.length > 0
            && email.length > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        let newInvalidFields = invalidFields.filter(field => field !== 'email');
        setInvalidFields(newInvalidFields);
        var enabled = event.target.value.length > 0
            && password.length > 0
            && username.length > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

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
                    {t('registration.title')}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={invalidFields.includes('email')}
                        margin="normal"
                        fullWidth
                        id="email"
                        label={t('registration.form.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmailChange}
                    />
                    <TextField
                        error={invalidFields.includes('username')}
                        margin="normal"
                        fullWidth
                        id="username"
                        label={t('registration.form.username')}
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleUsernameChange}
                    />
                    <FormControl sx={{ marginTop: 2, marginBottom: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="password">{t('registration.form.password')}</InputLabel>
                        <OutlinedInput
                            error={invalidFields.includes('password')}
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            fullWidth
                            label={t('registration.form.password')}
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
                        {t('registration.form.submit')}
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

export default Registration;