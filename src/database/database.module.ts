import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        // 👈 implement useFactory
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos');
        return tasks;
      },
      inject: [HttpService],
    },
  ],
  exports: ['TASKS'],
})
export class DatabaseModule {}
