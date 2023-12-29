import React from "react";
import {Button, MenuItem, Link} from "@mui/material";
import {usePopupState, bindHover, bindMenu} from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import './MenuLink.css';

const MenuLink = ({text, id, url, links}) => {

    const popupState = usePopupState({
        variant: 'popover',
        popupId: id + '-menu',
    })

    return (
        <Link href={url} id={id} {...bindHover(popupState)} variant="contained" aria-haspopup="true">
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
                              onClick={popupState.close}
                              sx={{ p: 0 }}>
                         <Link href={link.url} className="menu-link" sx={{color: 'black'}}>{link.text}</Link>
                    </MenuItem>
                )}
            </HoverMenu>
        </Link>
    )
}

export default MenuLink;