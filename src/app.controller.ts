import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { promises as fs } from "fs";
import Jimp = require('jimp');
import { CreateImageDto } from './create-image.dto';
let ExifImage = require('exif').ExifImage;

const downloadImage = async (url: URL, quality: number) => {
  const names = url.toString().split('/');
  const name = names[names.length - 1].split('.')[0];
  const originalPath = `./${name}.jpg`;
  const thumbPath = `./${name}_thumb.jpg`;

  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let metadata: any;

  try {
    new ExifImage({ image: buffer }, function (error: any, exifData: any) {
      if (error) {
        throw (error);
      } else {
        metadata = exifData;
      }
    });
  } catch (error) {
    throw (error);
  }

  await fs.writeFile(originalPath, buffer);

  const image = await Jimp.read(url.toString());
  const imgHeight = image.getHeight();
  const imgWidth = image.getWidth();
  const maxSize = 720;

  if (imgHeight < maxSize && imgWidth < maxSize) {
    await fs.writeFile(thumbPath, buffer);
  } else {
    if (imgWidth > imgHeight) {
      image.resize(maxSize, Jimp.AUTO);
    } else {
      image.resize(Jimp.AUTO, maxSize);
    }
    if (quality > 0 && quality < 1) {
      image.quality(quality * 100);
    }
    image.write(thumbPath);
  }
  return { originalPath, thumbPath, metadata };
}

@Controller('image/save')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async create(@Body() body: CreateImageDto): Promise<any> {
    let result = await downloadImage(body.image, body.compress);
    await this.appService.create({ metadata: result.metadata.exif });
    return {
      localpath: {
        original: result.originalPath,
        thumb: result.thumbPath,
      },
      metadata: result.metadata.exif
    }
  }

}