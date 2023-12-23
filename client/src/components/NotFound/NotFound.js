import React from 'react';
import Section from '../Section/Section';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Section title="Nie odnaleziono podanej strony">
            <Link to="/">Wróć do strony głównej</Link>
        </Section>
    );
}

export default NotFound;