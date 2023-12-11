import { PostVariant } from './post.interface';

export interface Feed {
  id: string;
  posts?: PostVariant[];
  subscriptionUserIds?: string[];
}
