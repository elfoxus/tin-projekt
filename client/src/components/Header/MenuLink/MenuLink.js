import React from "react";
import {Button, MenuItem} from "@mui/material";
import {usePopupState, bindHover, bindMenu} from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {Link} from "react-router-dom";

const MenuLink = ({text, id, url, links}) => {

    const popupState = usePopupState({
        variant: 'popover',
        popupId: id + '-menu',
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
                    <Link to={link.url} key={link.text}>
                    <MenuItem
                          className="capitalize"
                          onClick={popupState.close}>
                         {link.text}
                    </MenuItem>
                    </Link>
                )}
            </HoverMenu>
        </Link>
    )
}

export default MenuLink;