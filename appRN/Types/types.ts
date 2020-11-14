export type UserPublicData = {
  bio?: string;
  createdAt: number;
  displayName: string;
  fansCount: number;
  id: string;
  idolsCount: number;
  photoURL: string;
  updatedAt: number;
  website?: string;
};

export type UserPrivateData = {
  birthDate: number;
  createdAt: number;
  email: string;
  lastLogin: number;
  mfa: firebase.auth.MultiFactorInfo[];
  phoneNumber: string;
  updatedAt: number;
  // settings: string;
};

export type UserData = {
  private: UserPrivateData;
  public: UserPublicData;
};

export type VideoData = {
  filename: string;
  likeCount: number;
  ownerID: string;
  timestamp: number;
  title: string;
  uri: string;
};
