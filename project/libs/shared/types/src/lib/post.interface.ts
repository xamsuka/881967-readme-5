export enum PostType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUOTE = 'QUOTE',
  IMAGE = 'IMAGE',
  LINK = 'LINK',
}

export enum PostStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export enum ContentType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUOTE = 'QUOTE',
  IMAGE = 'IMAGE',
  LINK = 'LINK',
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  postId: string;
  createdDate: string;
}

export interface Post {
  id: string;
  createdUserId: string;
  tags?: string[];
  createdDate: string;
  updatedDate: string;
  status: PostStatus;
  isReposted?: boolean;
  likeCount: number;
  comments?: Comment[];
}

export interface VideoPost extends Post {
  name: string;
  type: ContentType;
  url: string;
}

export interface TextPost extends Post {
  name: string;
  text: string;
  announcementText: string;
  type: ContentType;
}

export interface QuotePost extends Post {
  type: ContentType;
  author: string;
}

export interface ImagePost extends Post {
  type: ContentType;
  url: string;
}

export interface LinkPost extends Post {
  type: ContentType;
  url: string;
  description: string;
}
