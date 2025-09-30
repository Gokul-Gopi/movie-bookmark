/*
  Warnings:

  - Added the required column `publishedOn` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Movie" ADD COLUMN     "publishedOn" TEXT NOT NULL;
