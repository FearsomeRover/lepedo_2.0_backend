/*
  Warnings:

  - You are about to drop the `_Recieved` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Recieved" DROP CONSTRAINT "_Recieved_A_fkey";

-- DropForeignKey
ALTER TABLE "_Recieved" DROP CONSTRAINT "_Recieved_B_fkey";

-- DropTable
DROP TABLE "_Recieved";

-- CreateTable
CREATE TABLE "_Received" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Received_AB_unique" ON "_Received"("A", "B");

-- CreateIndex
CREATE INDEX "_Received_B_index" ON "_Received"("B");

-- AddForeignKey
ALTER TABLE "_Received" ADD CONSTRAINT "_Received_A_fkey" FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Received" ADD CONSTRAINT "_Received_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
