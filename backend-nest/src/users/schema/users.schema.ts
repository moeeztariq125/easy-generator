import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, default: () => uuidv4() })
    userID: string
    @Prop()
    firstName: string
    @Prop()
    lastName: string
    @Prop()
    email: string
    @Prop()
    password: string
    @Prop()
    dob: Date
}

export const UserSchema = SchemaFactory.createForClass(User);
