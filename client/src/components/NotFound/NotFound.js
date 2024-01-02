import React from 'react';
import Section from '../Section/Section';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "@mui/material";
import {useTranslation} from "react-i18next";

const NotFound = () => {

    const { t } = useTranslation();

    return (
        <Section title={t('404.title')}>
            <Link href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HomeIcon />
                <span>{t('404.info')}</span>
            </Link>
        </Section>
    );
}

export default NotFound;