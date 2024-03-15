import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FileEntity from './file.entity';
import { Repository } from 'typeorm';
import { FilesResponseInterface } from './types/filesResponse.interface';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async findAll(): Promise<FilesResponseInterface> {
    const files = await this.fileRepository.find();
    const filesCount = files.length;
    return { files, filesCount };
  }

  async uploadFile(dataBuffer: Buffer, filename: string) {
    const newFile = await this.fileRepository.create({
      filename,
      data: dataBuffer,
    });

    await this.fileRepository.save(newFile);

    return newFile;
  }

  async getFileById(fileId: number) {
    const file = await this.fileRepository.findOne({
      where: { id: fileId },
    });

    if (!file) {
      throw new HttpException(`File doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return file;
  }
}
