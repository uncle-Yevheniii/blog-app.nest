/*
  Warnings:

  - You are about to drop the column `hash` on the `Users` table. All the data in the column will be lost.
  - Added the required column `hashPwd` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "hash",
ADD COLUMN     "hashPwd" TEXT NOT NULL,
ADD COLUMN     "hashRt" TEXT;
