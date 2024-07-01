import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { UserService } from './users.service';
import { UsersController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    providers: [UserService],
    controllers :[UsersController
      
    ]
})
export class UsersModule {}
