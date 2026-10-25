export type UserRole = 'USER' | 'WRITER' | 'MODERATOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
  bio?: string | null;
  role: UserRole;
  isVerifiedWriter?: boolean;
  followerCount?: number;
  followingCount?: number;
  storiesCount?: number;
  totalReads?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorProfile extends User {
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  isFollowing?: boolean;
}
