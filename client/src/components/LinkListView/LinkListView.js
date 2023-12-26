import React, {useEffect, useState} from 'react';
import axios from "axios";
import Section from "../Section/Section";
import {Link} from "@mui/material";

const LinkListView = ({url, sub_url, title = ""}) => {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        axios.get(url)
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
            <ul className="links">
                {links.map(item =>
                    <li><Link href={item.url}>{item.text}</Link></li>
                )}
            </ul>
        </Section>
    )
}

export default LinkListView;