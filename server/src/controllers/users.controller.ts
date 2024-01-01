import express from "express";
import verifyJWT from "../middleware/authRoutes";
import getAllUsers from "../usecases/users/get-all-users.usecase";
import updateUserRole from "../usecases/users/update-user-role.usecase";

const usersController = express.Router();

const roleMap = {
    'USER': 0,
    'MODERATOR': 1,
    'ADMIN': 2
}

const atLeastPassRole = (a: 'USER' | 'MODERATOR' | 'ADMIN', b: 'USER' | 'MODERATOR' | 'ADMIN') => {
    return roleMap[a] >= roleMap[b]
}

usersController.route('/')
    .get(verifyJWT, (req, res) => {
        const { username, role } = res.locals.user;

        if (!atLeastPassRole(role, 'MODERATOR')) {
            res.status(401).json({ message: "Unauthorized" });
        } else {
            getAllUsers().then(users => {
                res.json(users);
            })
        }
    })

usersController.route('/:id/role')
    .put(verifyJWT, (req, res) => {
        const { username, role } = res.locals.user;

        if (!atLeastPassRole(role, 'ADMIN')) {
            res.status(401).json({ message: "Unauthorized" });
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
    });

export default usersController;