import { v4 as uuidv4 } from "uuid";

import { UserEntity } from "../../common/entities/user.entity";
import { HashI } from "../../common/interfaces/hash.interface";
import { UserDto } from "../../common/dto/user.dto";

export class UserService {
  private _hash: HashI;

  constructor(initialHash: HashI) {
    this._hash = initialHash;
  }

  public validateData(body: UserDto): { [key: string]: string }[] {
    const errors: { [key: string]: string }[] = [];

    if (!body.age) {
      errors.push({ age: "Age is required field" });
    } else if (typeof body.age !== "number") {
      errors.push({ age: "Age is number field" });
    }

    if (!body.username) {
      errors.push({ username: "Username is required field" });
    } else if (typeof body.username !== "string") {
      errors.push({ username: "Username is number field" });
    }

    if (!body.hobbies) {
      errors.push({ hobbies: "Hobbies is required field" });
    } else if (body.hobbies.find((hobby) => typeof hobby !== "string")) {
      errors.push({ hobbies: "Hobbies is array of strings field" });
    }

    return errors;
  }

  public getAll = (): UserEntity[] => {
    const userRawData = this._hash.users;

    return Object.values(userRawData);
  };

  public create = (body: UserDto): UserEntity => {
    const id = uuidv4();

    const user = {
      id,
      ...body,
    };

    this._hash.users[id] = user;

    return user;
  };

  public getById = (id: string): UserEntity | null => {
    const userRawData = this._hash.users[id];

    return userRawData || null;
  };

  public update = (id: string, body: UserDto): UserEntity => {
    const userData = {
      id,
      ...body,
    };

    this._hash.users[id] = userData;

    return userData;
  };

  public delete = (id: string): string => {
    delete this._hash.users[id];

    return "User is deleted";
  };
}
