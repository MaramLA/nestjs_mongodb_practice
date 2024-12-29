import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ required: false, default: true })
  receiveNotifications?: boolean;

  @Prop({ required: false, default: true })
  receiveEmails?: boolean;

  @Prop({ required: false, default: true })
  receiveSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
