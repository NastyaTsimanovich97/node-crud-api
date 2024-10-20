import { UserEntity } from "../entities/user.entity";

export interface HashI {
  users: {
    [key: string]: UserEntity;
  };
}
