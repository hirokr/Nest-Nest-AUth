import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString =
      process.env.DATABASE_URL ||
      'postgresql://neondb_owner:npg_6VTxOo2akHny@ep-red-sky-a16eh76k-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

    console.log('connectionString', connectionString);
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }
}
