import {
  Comment,
  ContentType,
  PostStatus,
  TextPost,
} from '@project/libs/shared/types';

export class TextPostEntity implements TextPost {
  id: string;
  name: string;
  text: string;
  announcementText: string;
  type: ContentType;
  createdUserId: string;
  tags?: string[];
  createdDate: string;
  updatedDate: string;
  status: PostStatus;
  isReposted?: boolean;
  likeCount: number;
  comments?: Comment[];
}
