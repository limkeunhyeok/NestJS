import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OtherModule } from './other/other.module';

@Module({
  imports: [
    OtherModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
