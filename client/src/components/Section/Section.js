import React from "react";
import "./Section.css";

const Section = ({title = null, children, wrapperClasses = ""}) => {
    return (
        <section>
            <div className={"section-wrapper".concat(" ").concat(wrapperClasses)}>
                {title && <h1 className="section-title">{title}</h1>}
                <div>{children}</div>
            </div>
        </section>
    )
}

export default Section;