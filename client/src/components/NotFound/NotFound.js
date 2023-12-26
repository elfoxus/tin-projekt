import React from 'react';
import Section from '../Section/Section';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "@mui/material";

const NotFound = () => {
    return (
        <Section title="Nie odnaleziono podanej strony">
            <Link href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HomeIcon />
                <span>Wróć do strony głównej</span>
            </Link>
        </Section>
    );
}

export default NotFound;