import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

// export async function connectToDB() {
//   const user = await prisma.user.create({
//     data: {
//       email: "alice3@prisma.io",
//       username: "alice3",
//       hashed_password: "123456789",
//       first_name: "Alice",
//       last_name: "wonderland",
//       address: "street name",
//       address2: "",
//       city: "",
//       country: "",
//       verificationCode: "",
//     },
//   });
//   console.log(user);
// }
// connectToDB()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
