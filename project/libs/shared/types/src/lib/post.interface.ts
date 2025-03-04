import { $Enums } from '@prisma/client';

export interface Comment {
  id?: string;
  text: string;
  postId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VideoContent {
  id?: string;
  name: string;
  url: string;
}

export interface TextContent {
  id?: string;
  name: string;
  text: string;
  announcementText: string;
}

export interface QuoteContent {
  id?: string;
  text: string;
  author: string;
}

export interface ImageContent {
  id?: string;
  url: string;
}

export interface LinkContent {
  id?: string;
  url: string;
  description: string;
}

export interface Post {
  id?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  status?: $Enums.PostStatus;
  blogId?: string;
  type: $Enums.ContentType;
  likeCount?: number;
  comments?: Comment[];
  linkContent?: LinkContent;
  imageContent?: ImageContent;
  quoteContent?: QuoteContent;
  textContent?: TextContent;
  videoContent?: VideoContent;
}
