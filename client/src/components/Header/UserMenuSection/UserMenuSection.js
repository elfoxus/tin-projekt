import React, {Fragment, useContext} from "react";
import {UserContext} from "../../../services/auth";
import {Button, IconButton, MenuItem} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {bindHover, bindMenu, usePopupState} from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {logout} from "../../../services/authUtils";


const UserMenuSection = ({children}) => {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate()
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'user-menu',
    })

    const onLogout = () => {
        popupState.close();
        // logout
        logout()
            .then(() => {
                dispatch({type: 'logout'})
                navigate('/')
            })
    }

    return (
        <Fragment>
            {state.username ? (
                <Fragment>
                    <IconButton sx={{marginLeft: 'auto'}} {...bindHover(popupState)}>
                        <AccountCircle sx={{ color: 'white' }} />
                    </IconButton>
                    <HoverMenu
                        {...bindMenu(popupState)}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        transformOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                        <MenuItem onClick={onLogout}>
                            Wyloguj
                        </MenuItem>
                    </HoverMenu>
                </Fragment>
            ) : (
                <Fragment>
                    {children}
                </Fragment>
            )}
        </Fragment>
    )
}

export default UserMenuSection;