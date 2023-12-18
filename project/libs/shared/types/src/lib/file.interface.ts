export enum FileType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}

export interface File {
  id: string;
  url: string;
  type: FileType;
}
