import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FileEntity from './file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

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
      throw new NotFoundException();
    }

    return file;
  }
}
