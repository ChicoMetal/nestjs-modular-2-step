import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }

  // public prisma: PrismaClient;

  // constructor() {
  //   this.prisma = new PrismaClient();
  // }
}
// export class PrismaService extends PrismaClient implements OnModuleInit {
//     async onModuleInit() {
//         await this.$connect();
//     }
// }
