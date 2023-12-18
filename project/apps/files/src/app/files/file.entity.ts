import { File } from '@project/libs/shared/types';
import { FileType } from 'libs/shared/types/src/lib/file.interface';

export class FileEntity implements File {
  id: string;
  url: string;
  type: FileType;
}
