import { Global, HttpModule, HttpService, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        // 👈 implement useFactory
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
  exports: ['TASKS'],
})
export class DatabaseModule {}
