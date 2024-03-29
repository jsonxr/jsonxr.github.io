/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "oikogen";

export enum PhoneType {
  MOBILE = 0,
  HOME = 1,
  WORK = 2,
  UNRECOGNIZED = -1,
}

export function phoneTypeFromJSON(object: any): PhoneType {
  switch (object) {
    case 0:
    case "MOBILE":
      return PhoneType.MOBILE;
    case 1:
    case "HOME":
      return PhoneType.HOME;
    case 2:
    case "WORK":
      return PhoneType.WORK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PhoneType.UNRECOGNIZED;
  }
}

export function phoneTypeToJSON(object: PhoneType): string {
  switch (object) {
    case PhoneType.MOBILE:
      return "MOBILE";
    case PhoneType.HOME:
      return "HOME";
    case PhoneType.WORK:
      return "WORK";
    case PhoneType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Phone {
  number?: string | undefined;
  type?: PhoneType | undefined;
}

export interface Person {
  name: string;
  phones: Phone[];
}

function createBasePhone(): Phone {
  return { number: undefined, type: undefined };
}

export const Phone = {
  encode(message: Phone, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.number !== undefined) {
      writer.uint32(10).string(message.number);
    }
    if (message.type !== undefined) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Phone {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.number = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Phone {
    return {
      number: isSet(object.number) ? globalThis.String(object.number) : undefined,
      type: isSet(object.type) ? phoneTypeFromJSON(object.type) : undefined,
    };
  },

  toJSON(message: Phone): unknown {
    const obj: any = {};
    if (message.number !== undefined) {
      obj.number = message.number;
    }
    if (message.type !== undefined) {
      obj.type = phoneTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Phone>, I>>(base?: I): Phone {
    return Phone.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Phone>, I>>(object: I): Phone {
    const message = createBasePhone();
    message.number = object.number ?? undefined;
    message.type = object.type ?? undefined;
    return message;
  },
};

function createBasePerson(): Person {
  return { name: "", phones: [] };
}

export const Person = {
  encode(message: Person, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.phones) {
      Phone.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Person {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerson();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.phones.push(Phone.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Person {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      phones: globalThis.Array.isArray(object?.phones) ? object.phones.map((e: any) => Phone.fromJSON(e)) : [],
    };
  },

  toJSON(message: Person): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.phones?.length) {
      obj.phones = message.phones.map((e) => Phone.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Person>, I>>(base?: I): Person {
    return Person.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Person>, I>>(object: I): Person {
    const message = createBasePerson();
    message.name = object.name ?? "";
    message.phones = object.phones?.map((e) => Phone.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
