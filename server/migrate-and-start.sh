sleep 3 # implicit wait for database to start
npx prisma db push # push schema to database
npx prisma db seed # seed database
npm run start