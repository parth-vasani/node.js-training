import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "12345",
      "database": "test",
      "synchronize": false,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "migrations": ["dist/db/migrations/*{.ts,.js}"],
      "migrationsTableName": "migrations",
    
      // entities: [User],
      // synchronize:true,
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
