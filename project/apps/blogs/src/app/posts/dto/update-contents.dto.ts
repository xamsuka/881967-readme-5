import { PartialType } from '@nestjs/swagger';
import {
  CreateImageContentDto,
  CreateLinkContentDto,
  CreateQuoteContentDto,
  CreateTextContentDto,
  CreateVideoContentDto,
} from './create-contents.dto';

export class UpdateImageContentDto extends PartialType(CreateImageContentDto) {}

export class UpdateLinkContentDto extends PartialType(CreateLinkContentDto) {}

export class UpdateQuoteContentDto extends PartialType(CreateQuoteContentDto) {}

export class UpdateTextContentDto extends PartialType(CreateTextContentDto) {}

export class UpdateVideoContentDto extends PartialType(CreateVideoContentDto) {}
