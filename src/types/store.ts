import {
  Immutable,
  OrNull,
} from './utility';

export type StoreSchema = Record<string, unknown>;
export type EntityWithId<T> = T & { id: string };

export type FirestoreData<ProducedByOpenQuery extends StoreSchema, ProducedByDocQuery extends StoreSchema> = {
  [C in keyof ProducedByOpenQuery]: Record<string, ProducedByOpenQuery[C]>;
} & {
  [D in keyof ProducedByDocQuery]: ProducedByDocQuery[D];
};

export type FirestoreOrderedData<ProducedByOpenQuery extends StoreSchema, ProducedByDocQuery extends StoreSchema> = {
  [C in keyof ProducedByOpenQuery]: Array<EntityWithId<ProducedByOpenQuery[C]>>;
} & {
  [D in keyof ProducedByDocQuery]: Array<EntityWithId<ProducedByDocQuery[D]>>;
};

export type FirestoreState<
  MappedDatas extends StoreSchema,
  DirectData extends StoreSchema
> = Immutable<{
  data: Partial<FirestoreData<MappedDatas, DirectData>>;
  ordered: Partial<FirestoreOrderedData<MappedDatas, DirectData>>;
  errors: {
    allIds: string[];
    byQuery: Record<string, unknown>;
  };
  listeners: QueryListeners;
  status: {
    requested:  Record<string, boolean>;
    requesting: Record<string, boolean>; 
    timestamps: Record<string, number>;
  };
}>;

export type FirebaseState<ProfileDocument> = Immutable<{
  auth: AuthState;
  profile: Profile<ProfileDocument>;
  authError: unknown;
  errors: unknown[];
  isInitializing: boolean;
  listeners: QueryListeners;
  requested:  Record<string, boolean>;
  requesting: Record<string, boolean>; 
  timestamps: Record<string, number>;
}>;

export type AuthState = UserInfo & {
  isLoaded: boolean
  isEmpty: boolean
  apiKey: string
  appName: string
  authDomain: string
  createdAt: string
  emailVerified: boolean
  isAnonymous: boolean
  lastLoginAt: string
  providerData: OrNull<UserInfo[]>
  redirectEventId: null
  stsTokenManager: {
    accessToken: string
    apiKey: string
    expirationTime: number
    refreshToken: string
  }
};

export type UserInfo = {
  displayName: OrNull<string>;
  email: OrNull<string>;
  phoneNumber: OrNull<string>;
  photoURL: OrNull<string>;
  providerId: string;
  uid: string;
};

export type Profile<ProfileType> = {
  isLoaded: boolean
  isEmpty: boolean
  token?: {
    token: string
    expirationTime: string
    authTime: string
    issuedAtTime: string
    signInProvider: string
    signInSecondFactor: unknown;
    claims: {
      name: string
      picture: string
      iss: string
      aud: string
      auth_time: number
      user_id: string
      sub: string
      iat: number
      exp: number
      email: string
      email_verified: boolean
    };
  }
} & ProfileType

export type QueryListeners = {
  allIds: string[];
  byId: {
    [path: string]: {
      name: string
    }
  }
}
