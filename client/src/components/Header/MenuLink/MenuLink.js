import React, {Fragment} from "react";
import {Button, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {usePopupState, bindHover, bindMenu} from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";

const MenuLink = ({text, id, url, links}) => {

    const popupState = usePopupState({
        variant: 'popover'
    })

    return (
        <Link to={url} id={id} {...bindHover(popupState)} variant="contained" aria-haspopup="true">
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                {text}
            </Button>
            <HoverMenu
                {...bindMenu(popupState)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                {links.map((link) =>
                    <MenuItem key={link.text}
                              className="capitalize"
                              onClick={popupState.close}>
                         <Link to={link.url}>{link.text}</Link>
                    </MenuItem>
                )}
            </HoverMenu>
        </Link>
    )
}

export default MenuLink;