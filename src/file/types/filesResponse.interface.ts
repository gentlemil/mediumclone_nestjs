import FileEntity from '../file.entity';

export interface FilesResponseInterface {
  files: FileEntity[];
  filesCount: number;
}
