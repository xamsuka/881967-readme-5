import {
  Comment,
  ContentType,
  PostStatus,
  VideoPost,
} from '@project/libs/shared/types';

export class VideoPostEntity implements VideoPost {
  id: string;
  name: string;
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
