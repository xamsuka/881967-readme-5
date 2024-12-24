import { Post } from './post.interface';

export interface Feed {
  id: string;
  posts?: Post[];
  subscriptionUserIds?: string[];
}
