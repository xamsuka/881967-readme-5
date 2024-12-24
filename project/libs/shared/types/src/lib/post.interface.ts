export enum PostStatus {
  PUBLISHED = 'PUBLISH',
  DRAFT = 'DRAFT',
}

export enum ContentType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUOTE = 'QUOTE',
  IMAGE = 'IMAGE',
  LINK = 'LINK',
}

export interface Post {
  id: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  status: PostStatus;
  blogId: string;
  type: ContentType;
  likeCount: number;
  comments?: Comment[];
}

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
