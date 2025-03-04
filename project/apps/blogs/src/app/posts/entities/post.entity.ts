import { $Enums } from '@prisma/client';
import { Comment, Post } from '@project/libs/shared/types';
import {
  ImageContent,
  LinkContent,
  QuoteContent,
  TextContent,
  VideoContent,
} from 'libs/shared/types/src/lib/post.interface';

export class PostEntity implements Post {
  id?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  status: $Enums.PostStatus;
  blogId?: string;
  type: $Enums.ContentType;
  likeCount: number;
  comments?: Comment[];
  linkContent?: LinkContent;
  imageContent?: ImageContent;
  quoteContent?: QuoteContent;
  textContent?: TextContent;
  videoContent?: VideoContent;

  constructor(post: Post) {
    this.populate(post);
  }

  toPOJO(): Post {
    return {
      id: this.id,
      blogId: this.blogId,
      status: this.status,
      type: this.type,
      likeCount: this.likeCount,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
      comments: this.comments,
      tags: this.tags,
      imageContent: this.imageContent,
      linkContent: this.linkContent,
      quoteContent: this.quoteContent,
      textContent: this.textContent,
      videoContent: this.videoContent,
    };
  }

  populate(post: Post) {
    const {
      id,
      blogId,
      likeCount,
      status,
      type,
      comments,
      createdAt,
      tags,
      updatedAt,
      imageContent,
      linkContent,
      quoteContent,
      textContent,
      videoContent,
    } = post;

    this.id = id;
    this.blogId = blogId;
    this.status = status;
    this.type = type;
    this.likeCount = likeCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.comments = comments;
    this.tags = tags;
    this.imageContent = imageContent;
    this.quoteContent = quoteContent;
    this.videoContent = videoContent;
    this.linkContent = linkContent;
    this.textContent = textContent;
  }

  static fromObject(post: Post): PostEntity {
    return new PostEntity(post);
  }
}
