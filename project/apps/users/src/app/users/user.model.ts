import { User } from '@project/libs/shared/types';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements User {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
    isRequired: true,
  })
  id: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  avatarUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
