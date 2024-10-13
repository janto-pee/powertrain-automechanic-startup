/*
  Warnings:

  - Made the column `hashed_password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_email_verified` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashed_password" SET NOT NULL,
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "address2" DROP NOT NULL,
ALTER COLUMN "is_email_verified" SET NOT NULL;
