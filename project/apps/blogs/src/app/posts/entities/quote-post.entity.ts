import {
  Comment,
  ContentType,
  PostStatus,
  QuotePost,
} from '@project/libs/shared/types';

export class QuotePostEntity implements QuotePost {
  id: string;
  type: ContentType;
  author: string;
  createdUserId: string;
  tags?: string[];
  createdDate: string;
  updatedDate: string;
  status: PostStatus;
  isReposted?: boolean;
  likeCount: number;
  comments?: Comment[];
}
