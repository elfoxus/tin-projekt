import React, {useEffect, useState} from 'react';
import Section from "../Section/Section";
import Button from "@mui/material/Button";
import api from "../../services/api";
import {Box} from "@mui/material";

const LinkListView = ({url, sub_url, title = ""}) => {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        api.get(url)
            .then(response => {
                var links = response.data.map(link => {
                    return {
                        text: link,
                        url: `/${sub_url}/${link}`
                    }
                });
                setLinks(links);
            })
            .catch(error => console.log(error));
    }, [url]);

    return (
        <Section title={title}>
            <Box sx={{
                marginTop: 1,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1
            }}>
                {links.map(item =>
                    <Button variant="outlined" href={item.url} key={item.text}>{item.text}</Button>
                )}
            </Box>
        </Section>
    )
}

export default LinkListView;