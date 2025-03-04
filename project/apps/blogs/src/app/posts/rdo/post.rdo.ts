import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEnum, IsISO8601 } from 'class-validator';
import {
  ImageContentRdo,
  LinkContentRdo,
  QuoteContentRdo,
  TextContentRdo,
  VideoContentRdo,
} from './contents.rdo';

export class PostRdo {
  @ApiProperty({
    description: 'Идентификатор поста',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Теги',
    example: ['123', '123'],
    required: false,
  })
  @Expose()
  tags?: string[];

  @ApiProperty({
    description: 'Дата создания',
    example: '2025-03-04T04:33:53.408Z',
  })
  @IsISO8601()
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    description: 'Дата обновления',
    example: '2025-03-04T04:33:53.408Z',
  })
  @IsISO8601()
  @Expose()
  updatedAt?: Date;

  @ApiProperty({
    description: 'Стаус',
    example: 'PUBLISH - опубликовано; DRAFT - не опубликовано',
  })
  @IsEnum($Enums.PostStatus)
  @Expose()
  status: $Enums.PostStatus;

  @ApiProperty({
    description: 'Идентификатор блога',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  blogId: string;

  @ApiProperty({
    description:
      'VIDEO - видео; TEXT - текст; QUOTE - цитата; IMAGE - изображение; LINK - ссылка;',
    example: 'TEXT',
  })
  @IsEnum($Enums.ContentType)
  @Expose()
  type: $Enums.ContentType;

  @ApiProperty({
    description: 'Количество лайков',
    example: '30',
  })
  @Expose()
  likeCount: number;

  @ApiProperty({
    description: 'Публикация типа «Ссылка»',
    required: false,
  })
  @Expose()
  linkContent?: LinkContentRdo;

  @ApiProperty({
    description: 'Публикация типа «Изображение»',
    required: false,
  })
  @Expose()
  imageContent?: ImageContentRdo;

  @ApiProperty({
    description: 'Публикация типа «Цитата»',
    required: false,
  })
  @Expose()
  quoteContent?: QuoteContentRdo;

  @ApiProperty({
    description: 'Публикация типа «Текст»',
    required: false,
  })
  @Expose()
  textContent?: TextContentRdo;

  @ApiProperty({
    description: 'Публикация типа «Видео»',
    required: false,
  })
  @Expose()
  videoContent?: VideoContentRdo;
}
