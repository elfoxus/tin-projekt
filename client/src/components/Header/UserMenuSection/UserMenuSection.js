import React, {Fragment, useContext} from "react";
import {UserContext} from "../../../services/auth";
import {Chip, IconButton, MenuItem} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {bindHover, bindMenu, usePopupState} from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {logout} from "../../../services/authUtils";
import Avatar from "@mui/material/Avatar";


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
                    <Chip avatar={<Avatar>{state.username.substring(0, 1).toUpperCase()}</Avatar>}
                          {...bindHover(popupState)}
                          sx={{marginLeft: 'auto', backgroundColor: 'primary.light', color: 'white'}}
                          label={'Witaj ' + state.username}
                    />
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