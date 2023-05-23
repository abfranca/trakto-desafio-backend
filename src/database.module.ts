import { Module } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';

@Module({
    providers: [
        {
            provide: 'DATABASE_CONNECTION',
            useFactory: async (): Promise<Db> => {
                try {
                    const client = await MongoClient.connect('mongodb://127.0.0.1/',);

                    const db = client.db('trakto_desafio_backend_db');

                    return db;
                } catch (e) {
                    throw e;
                }
            }
        },
    ],
    exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule { }