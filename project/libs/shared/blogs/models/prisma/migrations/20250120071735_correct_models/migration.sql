/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `blogs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "blogs_name_key" ON "blogs"("name");
