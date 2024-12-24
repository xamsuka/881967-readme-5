/*
  Warnings:

  - You are about to alter the column `name` on the `blogs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `description` on the `link_content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `author` on the `quote_content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `text` on the `quote_content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `name` on the `text_content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `text` on the `text_content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1024)`.
  - You are about to alter the column `announcement_text` on the `text_content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `video_content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "link_content" ALTER COLUMN "description" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "quote_content" ALTER COLUMN "author" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "text" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "text_content" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "text" SET DATA TYPE VARCHAR(1024),
ALTER COLUMN "announcement_text" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "video_content" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE INDEX "blogs_name_idx" ON "blogs"("name");
