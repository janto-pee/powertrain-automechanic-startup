-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_username_fkey";

-- DropIndex
DROP INDEX "Session_username_key";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
