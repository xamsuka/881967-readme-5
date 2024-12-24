import { Blog, Post } from '@project/libs/shared/types';

export class BlogEntity implements Blog {
  id?: string;
  name: string;
  userId: string;

  constructor(createBlog: Blog) {
    this.populate(createBlog);
  }

  toPOJO(): Blog {
    return {
      id: this.id,
      name: this.name,
      userId: this.userId,
    };
  }

  populate(createBlog: Blog) {
    const { name, userId, id } = createBlog;

    this.name = name;
    this.userId = userId;
    this.id = id;
  }

  static fromObject(data: Blog): BlogEntity {
    return new BlogEntity(data);
  }
}
