import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { ContentType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { ValidateIf, IsNotEmpty } from 'class-validator';
import {
  CreateLinkContentDto,
  CreateImageContentDto,
  CreateQuoteContentDto,
  CreateTextContentDto,
  CreateVideoContentDto,
} from './create-contents.dto';
import {
  UpdateImageContentDto,
  UpdateLinkContentDto,
  UpdateQuoteContentDto,
  UpdateTextContentDto,
  UpdateVideoContentDto,
} from './update-contents.dto';

export class UpdatePostDto extends PickType(CreatePostDto, [
  'tags',
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
  linkContent?: UpdateLinkContentDto;

  @ApiProperty({
    description: 'Публикация типа «Изображение»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.IMAGE)
  @IsNotEmpty({
    message: 'для type = IMAGE, imageContent обязательно',
  })
  @Expose()
  imageContent?: UpdateImageContentDto;

  @ApiProperty({
    description: 'Публикация типа «Цитата»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.QUOTE)
  @IsNotEmpty({
    message: 'для type = QUOTE, quoteContent обязательно',
  })
  @Expose()
  quoteContent?: UpdateQuoteContentDto;

  @ApiProperty({
    description: 'Публикация типа «Текст»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.TEXT)
  @IsNotEmpty({
    message: 'для type = TEXT, textContent обязательно',
  })
  @Expose()
  textContent?: UpdateTextContentDto;

  @ApiProperty({
    description: 'Публикация типа «Видео»',
    required: false,
  })
  @ValidateIf((o) => o.type === ContentType.VIDEO)
  @IsNotEmpty({
    message: 'для type = VIDEO, videoContent обязательно',
  })
  @Expose()
  videoContent?: UpdateVideoContentDto;
}
