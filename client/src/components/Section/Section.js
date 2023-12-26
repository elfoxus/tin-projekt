import React from "react";
import "./Section.css";
import {Typography} from "@mui/material";

const Section = ({title = null, children, wrapperClasses = ""}) => {
    return (
        <section>
            <div className={"section-wrapper".concat(" ").concat(wrapperClasses)}>
                {title && <Typography variant="h3" className="section-title">{title}</Typography>}
                <div>{children}</div>
            </div>
        </section>
    )
}

export default Section;