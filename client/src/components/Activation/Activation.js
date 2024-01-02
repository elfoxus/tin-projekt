import React, {useEffect} from "react";
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../services/api";
import {useTranslation} from "react-i18next";

const Activation = () => {
    const { t } = useTranslation();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/activate/' + params.token, )
            .then(res => {
                navigate('/')
            }).catch(err => {
                if(err.response.status === 500) {
                    setTimeout(() => {
                        navigate('/500')
                    }, 1000);
                } else {
                    setTimeout(() => {
                        navigate('/404')
                    }, 1000);
                }
        })
    }, []);

    return (
        <Box sx={{height: '100%'}}>
            <Box sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px'}}>
                <Typography variant="h2" color="primary.main">{t('activation.info')}</Typography>
                <CircularProgress size={130} />
            </Box>
        </Box>
    )
}

export default Activation;