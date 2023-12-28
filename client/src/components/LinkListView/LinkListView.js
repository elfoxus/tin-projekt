import React, {useEffect, useState} from 'react';
import Section from "../Section/Section";
import {Link} from "@mui/material";
import api from "../../services/api";

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
            <ul className="links">
                {links.map(item =>
                    <li><Link href={item.url}>{item.text}</Link></li>
                )}
            </ul>
        </Section>
    )
}

export default LinkListView;