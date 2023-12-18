import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@localhost' },
        update: {},
        create: {
            email: 'admin@localhost',
            password: 'admin',
            role: 'ADMIN',
            birthdate: new Date(),
            name: 'Admin',
            surname: 'Admin',
            username: 'admin',
            activate_time: new Date(),
        }
    });
    console.log("Admin created with default login and password")
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });