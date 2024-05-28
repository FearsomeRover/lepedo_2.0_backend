/*
  Warnings:

  - You are about to drop the column `auth0sub` on the `User` table. All the data in the column will be lost.
  - Added the required column `isAccepted` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_auth0sub_key";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "auth0sub";
