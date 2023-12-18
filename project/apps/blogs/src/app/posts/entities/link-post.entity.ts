import {
  Comment,
  ContentType,
  ImagePost,
  PostStatus,
} from '@project/libs/shared/types';

export class LinkPostEntity implements ImagePost {
  id: string;
  type: ContentType;
  url: string;
  createdUserId: string;
  tags?: string[];
  createdDate: string;
  updatedDate: string;
  status: PostStatus;
  isReposted?: boolean;
  likeCount: number;
  comments?: Comment[];
}
