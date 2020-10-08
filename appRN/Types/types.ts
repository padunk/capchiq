export type UserPublicData = {
  displayName: string;
  photoURL: string;
  updatedAt: number;
  createdAt: number;
  idolsCount: number;
  fansCount: number;
  id: string;
  bio: string;
  website: string;
};

export type UserPrivateData = {
  email: string;
  lastLogin: number;
  phoneNumber: string;
  mfa: firebase.auth.MultiFactorInfo[];
  birthDate: number;
  createdAt: number;
  updatedAt: number;
  // settings: string;
};

export type VideoData = {
  filename: string;
  title: string;
  uri: string;
  timestamp: number;
  likeCount: number;
  ownerID: string;
};
