/*
  Warnings:

  - Added the required column `amount` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "date" TEXT;

-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "amount" INTEGER NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;
