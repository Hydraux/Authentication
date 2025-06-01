import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/user.module";
import { TypeOrmConfigModule } from "./modules/typeorm.module";

@Module({
  imports: [
    // Configuration first
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    
    // Database configuration
    TypeOrmConfigModule,
    
    // Feature modules
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}