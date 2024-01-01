import { Request, Response } from "express";
import getAllUsers from "../usecases/users/get-all-users.usecase";
import updateUserRole from "../usecases/users/update-user-role.usecase";

const roleMap = {
    'USER': 0,
    'MODERATOR': 1,
    'ADMIN': 2
}

const atLeastPassRole = (a: 'USER' | 'MODERATOR' | 'ADMIN', b: 'USER' | 'MODERATOR' | 'ADMIN') => {
    return roleMap[a] >= roleMap[b]
}

const allUsers = (req: Request, res: Response) => {
    const { username, role } = res.locals.user;

    if (!atLeastPassRole(role, 'ADMIN')) {
        res.status(403).json({ message: "Unauthorized" });
    } else {
        getAllUsers().then(users => {
            res.json(users);
        })
    }
}

const newUserRole = (req: Request, res: Response) => {
    const { username, role } = res.locals.user;

    if (!atLeastPassRole(role, 'ADMIN')) {
        res.status(403).json({ message: "Unauthorized" });
    } else {
        const { id } = req.params;
        const { role } = req.body;

        if (!role) {
            res.status(400).json({message: "Role is required."});
        } else {
            updateUserRole(parseInt(id), role).then(user => {
                res.json(user);
            }).catch(err => {
                res.status(400).json({message: err.message});
            })
        }
    }
}

export {
    allUsers,
    newUserRole
}
