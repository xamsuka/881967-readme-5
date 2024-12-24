-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "link_content" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "quote_content" ALTER COLUMN "author" SET DATA TYPE TEXT,
ALTER COLUMN "text" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "text_content" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "text" SET DATA TYPE TEXT,
ALTER COLUMN "announcement_text" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "video_content" ALTER COLUMN "name" SET DATA TYPE TEXT;
