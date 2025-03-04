import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';

export class ImageContentRdo {
  @ApiProperty({
    description: 'Идентификатор контента',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Ссылка',
    example:
      'https://www.kasandbox.org/programming-images/avatars/leaf-blue.png',
  })
  @IsUrl()
  @Expose()
  url: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  postId: string;
}

export class LinkContentRdo {
  @ApiProperty({
    description: 'Идентификатор контента',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Описание',
    example: 'тестовое описание',
  })
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Ссылка',
    example:
      'https://www.kasandbox.org/programming-images/avatars/leaf-blue.png',
  })
  @IsUrl()
  @Expose()
  url: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  postId: string;
}

export class QuoteContentRdo {
  @ApiProperty({
    description: 'Идентификатор контента',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Автор',
    example: 'Владислав К.',
  })
  @IsString()
  @Expose()
  author: string;

  @ApiProperty({
    description: 'Текст',
    example: 'Всем привет!',
  })
  @IsString()
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  postId: string;
}

export class TextContentRdo {
  @ApiProperty({
    description: 'Идентификатор контента',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Текст публикации',
    example: 'Lorem',
  })
  @IsString()
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Название публикации',
    example: 'Мой новый пост',
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Текст с анонсом публикации',
    example: 'Анонс',
  })
  @IsString()
  @Expose()
  announcementText: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  postId: string;
}

export class VideoContentRdo {
  @ApiProperty({
    description: 'Идентификатор контента',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Название публикации',
    example: 'Мой новый пост',
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Ссылка',
    example:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  })
  @IsUrl()
  @Expose()
  url: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  postId: string;
}
