import { ApiProperty, PickType } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { PostRdo } from '../rdo/post.rdo';
import {
  CreateImageContentDto,
  CreateLinkContentDto,
  CreateQuoteContentDto,
  CreateTextContentDto,
  CreateVideoContentDto,
} from './create-contents.dto';

export class CreatePostDto extends PickType(PostRdo, [
  'tags',
  'blogId',
  'type',
] as const) {
  @ApiProperty({
    description: 'Публикация типа «Ссылка»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.LINK)
  @IsNotEmpty({
    message: 'для type = LINK, linkContent обязательно',
  })
  @Expose()
  linkContent?: CreateLinkContentDto;

  @ApiProperty({
    description: 'Публикация типа «Изображение»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.IMAGE)
  @IsNotEmpty({
    message: 'для type = IMAGE, imageContent обязательно',
  })
  @Expose()
  imageContent?: CreateImageContentDto;

  @ApiProperty({
    description: 'Публикация типа «Цитата»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.QUOTE)
  @IsNotEmpty({
    message: 'для type = QUOTE, quoteContent обязательно',
  })
  @Expose()
  quoteContent?: CreateQuoteContentDto;

  @ApiProperty({
    description: 'Публикация типа «Текст»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.TEXT)
  @IsNotEmpty({
    message: 'для type = TEXT, textContent обязательно',
  })
  @Expose()
  textContent?: CreateTextContentDto;

  @ApiProperty({
    description: 'Публикация типа «Видео»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.VIDEO)
  @IsNotEmpty({
    message: 'для type = VIDEO, videoContent обязательно',
  })
  @Expose()
  videoContent?: CreateVideoContentDto;
}
