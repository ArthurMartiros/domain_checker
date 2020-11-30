import { ForbiddenException, HttpException } from '@nestjs/common';
import { extname } from 'path';

export const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(csv)$/)) {
      return callback(new ForbiddenException('Only csv files are allowed!'), false);
    }
    callback(null, true);
  };
  
  export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
      callback(null, `${name}-${randomName}${fileExtName}`);
  };