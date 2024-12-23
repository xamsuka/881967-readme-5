import { PostStatus, PrismaClient } from '@prisma/client';

const FIRST_BLOG_UUID = '4be5ae83-a3f3-4900-b1ad-2baf72a2e009';

const FIRST_POST_UUID = 'b5f44955-ea3d-4f7c-99f6-c57878e86c58';
const SECOND_POST_UUID = '90bb86f9-8b40-409c-8b03-23bcacf29daf';

const FIRST_USER_ID = 'a5aaf610-e935-473d-9d20-f7cdc78a160d';

function getBlog() {
  return { id: FIRST_BLOG_UUID, name: 'Мой блог', userId: FIRST_USER_ID };
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      tags: ['Первый тег', 'Второй тег'],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: PostStatus.PUBLISH,
      blogId: FIRST_BLOG_UUID,
      likeCount: 0,
      comments: [
        {
          id: 'e8cfa2da-a0ca-4b76-b1cc-3d19c47dae9a',
          createdAt: new Date(),
          updatedAt: new Date(),
          text: 'Новый коментарий',
        },
        {
          id: '9f625b03-60fa-4ed9-8862-b5f542015b4b',
          createdAt: new Date(),
          updatedAt: new Date(),
          text: 'Старый коментарий',
        },
      ],
    },
    {
      id: SECOND_POST_UUID,
      tags: ['Новый тег', 'Старый тег'],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: PostStatus.PUBLISH,
      blogId: FIRST_BLOG_UUID,
      likeCount: 10,
      comments: [
        {
          id: 'ccfac599-17db-4a05-9734-5a90d96a56ca',
          createdAt: new Date(),
          updatedAt: new Date(),
          text: 'Новый коментарий',
        },
        {
          id: '3c5af2b9-e76b-4dea-a058-2474ab7720a3',
          createdAt: new Date(),
          updatedAt: new Date(),
          text: 'Старый коментарий',
        },
      ],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockBlog = getBlog();

  await prismaClient.blog.upsert({
    where: { id: mockBlog.id },
    update: {},
    create: {
      id: mockBlog.id,
      name: mockBlog.name,
      userId: mockBlog.userId,
    },
  });

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        tags: post.tags,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        status: post.status,
        blogId: post.blogId,
        likeCount: post.likeCount,
        comments: post.comments
          ? {
              create: post.comments,
            }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
