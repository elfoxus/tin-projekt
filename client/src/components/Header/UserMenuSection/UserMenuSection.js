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
import {useTranslation} from "react-i18next";

const UserMenuSection = ({children}) => {
    const { t } = useTranslation();
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
                          label={t('header.user-menu.add-recipe')}
                          sx={{marginLeft: 'auto', backgroundColor: 'primary.light', color: 'white'}} />
                    <Chip avatar={<Avatar>{state.username.substring(0, 1).toUpperCase()}</Avatar>}
                          {...bindHover(popupState)}
                          sx={{marginLeft: 'auto', backgroundColor: 'primary.light', color: 'white'}}
                          label={t('header.user-menu.welcome') + ' ' + state.username}
                    />
                    <HoverMenu
                        {...bindMenu(popupState)}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        transformOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                        {(state.role === 'ADMIN') && (
                            <Link href="/users">
                                <MenuItem>
                                    <ListItemIcon><SupervisedUserCircleOutlinedIcon color="primary"/></ListItemIcon>
                                    <ListItemText>{t('header.user-menu.users')}</ListItemText>
                                </MenuItem>
                            </Link>
                        )}
                        <Link href="/my-recipes">
                            <MenuItem>
                                <ListItemIcon><LocalDiningOutlinedIcon color="primary"/></ListItemIcon>
                                <ListItemText>{t('header.user-menu.my-recipes')}</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link href="/favourites">
                            <MenuItem>
                                <ListItemIcon><FavoriteOutlinedIcon color="primary"/></ListItemIcon>
                                <ListItemText>{t('header.user-menu.fav')}</ListItemText>
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={onLogout} sx={{color: "primary.main"}}>
                            <ListItemIcon><Logout color="primary"/></ListItemIcon>
                            <ListItemText>{t('header.user-menu.logout')}</ListItemText>
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