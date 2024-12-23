-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PUBLISH', 'DRAFT');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('VIDEO', 'TEXT', 'QUOTE', 'IMAGE', 'LINK');

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "PostStatus" NOT NULL,
    "blog_id" TEXT NOT NULL,
    "like_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_content" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT[],
    "post_id" TEXT NOT NULL,

    CONSTRAINT "video_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_content" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "announcement_text" TEXT NOT NULL,
    "tags" TEXT[],
    "post_id" TEXT NOT NULL,

    CONSTRAINT "text_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_content" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "tags" TEXT[],
    "post_id" TEXT NOT NULL,

    CONSTRAINT "quote_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_content" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT[],
    "post_id" TEXT NOT NULL,

    CONSTRAINT "image_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_content" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "post_id" TEXT NOT NULL,

    CONSTRAINT "link_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "video_content_post_id_key" ON "video_content"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "text_content_post_id_key" ON "text_content"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "quote_content_post_id_key" ON "quote_content"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "image_content_post_id_key" ON "image_content"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "link_content_post_id_key" ON "link_content"("post_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_content" ADD CONSTRAINT "video_content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_content" ADD CONSTRAINT "text_content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_content" ADD CONSTRAINT "quote_content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_content" ADD CONSTRAINT "image_content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_content" ADD CONSTRAINT "link_content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
