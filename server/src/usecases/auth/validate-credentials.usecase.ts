import bcrypt from "bcrypt";
import {prisma} from "../../services/db/prisma";
import {AuthRequest, User} from "../../model/user";

export const validateCredentials = async (authData: AuthRequest): Promise<{validated: boolean, user?: User}> => {
    const user = await prisma.user.findUnique({
        where: {
            username: authData.username
        }
    });
    if(!user) {
        return { validated: false };
    }
    let validated = await bcrypt.compare(authData.password, user.password);
    const data: {validated: boolean, user?: User} = { validated };
    if(validated) {
        data.user = {
            username: user.username,
            role: user.role
        };
    }
    return data;
}