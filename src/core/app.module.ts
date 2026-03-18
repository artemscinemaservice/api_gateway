import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../modules/auth/auth.module';

import { AppController } from './app.controller';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
