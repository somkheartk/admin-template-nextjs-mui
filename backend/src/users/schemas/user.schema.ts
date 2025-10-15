import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.STAFF 
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
