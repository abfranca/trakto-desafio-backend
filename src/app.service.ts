import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) { }

  async create(body: Object): Promise<void> {
    await this.db.collection('metadata').insertOne(body);
  }
}
