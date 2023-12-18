import { Feed, PostVariant } from '@project/libs/shared/types';

export class FeedEntity implements Feed {
  id: string;
  posts?: PostVariant[];
  subscriptionUserIds?: string[];
}
