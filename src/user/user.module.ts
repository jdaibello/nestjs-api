import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), FileModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserModule],
})
export class UserModule {}
