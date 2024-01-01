import React, {Fragment, useContext} from "react";
import {UserContext} from "../../../services/auth";
import {Chip, MenuItem, Link, ListItemIcon, ListItemText, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {bindHover, bindMenu, usePopupState} from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {logout} from "../../../services/authUtils";
import Avatar from "@mui/material/Avatar";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Logout from '@mui/icons-material/Logout';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';

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
                <Box sx={{display: 'flex', gap: 2}}>
                    <Chip component="a"
                          clickable
                          href="/add-recipe"
                          icon={<AddCircleOutlineOutlinedIcon color="primary.light" />}
                          label="Dodaj przepis"
                          sx={{marginLeft: 'auto', backgroundColor: 'primary.light', color: 'white'}} />
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
                        {(state.role === 'ADMIN' || state.role === 'MODERATOR') && (
                            <Link href="/users">
                                <MenuItem>
                                    <ListItemIcon><SupervisedUserCircleOutlinedIcon color="primary"/></ListItemIcon>
                                    <ListItemText>Użytkownicy</ListItemText>
                                </MenuItem>
                            </Link>
                        )}
                        <Link href="/my-recipes">
                            <MenuItem>
                                <ListItemIcon><LocalDiningOutlinedIcon color="primary"/></ListItemIcon>
                                <ListItemText>Moje przepisy</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link href="/favourites">
                            <MenuItem>
                                <ListItemIcon><FavoriteOutlinedIcon color="primary"/></ListItemIcon>
                                <ListItemText>Ulubione</ListItemText>
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={onLogout} sx={{color: "primary.main"}}>
                            <ListItemIcon><Logout color="primary"/></ListItemIcon>
                            <ListItemText>Wyloguj</ListItemText>
                        </MenuItem>
                    </HoverMenu>
                </Box>
            ) : (
                <Fragment>
                    {children}
                </Fragment>
            )}
        </Fragment>
    )
}

export default UserMenuSection;