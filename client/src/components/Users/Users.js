import React, {useEffect, useState} from "react";
import Section from "../Section/Section";
import api from "../../services/api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useTranslation} from "react-i18next";

const Users = () => {

    const { t } = useTranslation();

    const [users, setUsers] = useState([]);
    const roles = ['USER', 'MODERATOR', 'ADMIN'];

    useEffect(() => {
        api.get('/users')
            .then(response => {
                console.log(response.data)
                setUsers(response.data)
            })
    }, []);

    const updateUserRole = (id, role) => {
        if(role === null) return;
        console.log(id, role);
        api.put(`/users/${id}/role`, {role: role})
            .then(response => {
                console.log(response.data)
                setUsers(users.map(user => {
                    if (user.id === id) {
                        return {...user, role: role}
                    }
                    return user
                }))
            })
            .catch(error => console.log(error));
    }

    return (
        <Section title={t('users.title')}>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label={t('users.title')}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('users.table.id')}</TableCell>
                            <TableCell>{t('users.table.name')}</TableCell>
                            <TableCell>{t('users.table.email')}</TableCell>
                            <TableCell>{t('users.table.active-from')}</TableCell>
                            <TableCell>{t('users.table.recipes-count')}</TableCell>
                            <TableCell>{t('users.table.role')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) =>
                            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.activate_time}</TableCell>
                                <TableCell>{user.recipe.length}</TableCell>
                                <TableCell>
                                    <Autocomplete
                                        options={roles}
                                        value={user.role}
                                        onChange={(event, newValue) => updateUserRole(user.id, newValue)}
                                        sx={{ width: 200 }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Section>
    )
}


export default Users;