import { OmitType } from '@nestjs/swagger';
import {
  ImageContentRdo,
  LinkContentRdo,
  QuoteContentRdo,
  TextContentRdo,
  VideoContentRdo,
} from '../rdo/contents.rdo';

export class CreateImageContentDto extends OmitType(ImageContentRdo, [
  'id',
  'postId',
] as const) {}

export class CreateLinkContentDto extends OmitType(LinkContentRdo, [
  'id',
  'postId',
] as const) {}

export class CreateQuoteContentDto extends OmitType(QuoteContentRdo, [
  'id',
  'postId',
] as const) {}

export class CreateTextContentDto extends OmitType(TextContentRdo, [
  'id',
  'postId',
] as const) {}

export class CreateVideoContentDto extends OmitType(VideoContentRdo, [
  'id',
  'postId',
] as const) {}
