export type User = {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  bio?: string;
  tsPoints: number;
  referrals: number;
  streak: number;
  referralCode: string;
};

export type ActivityItem = {
  id: string;
  label: string;
  value: string;
  meta: string;
};

export type SignalCardData = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  change: number;
  badge?: string;
  tone: "up" | "down" | "neutral";
  size?: "lg" | "md" | "sm";
  sparkline: number[];
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  rewardTs: number;
  progress: number;
  goal: number;
  status: "available" | "completed";
};

export type Metric = {
  label: string;
  value: string;
  hint: string;
};

export type AppState = {
  user: User;
  activity: ActivityItem[];
  loading: boolean;
  isMiniApp: boolean;
  shareUrl: string;
  claimStatus: string | null;
  refresh: () => Promise<void>;
};

export type StoredUser = User & {
  createdAt: string;
  updatedAt: string;
  activity: ActivityItem[];
};

export type ReferralPair = {
  referrerFid: number;
  referredFid: number;
  createdAt: string;
};

export type SessionRecord = {
  id: string;
  fid: number;
  createdAt: string;
  updatedAt: string;
};

export type StoreData = {
  users: Record<string, StoredUser>;
  referrals: ReferralPair[];
  sessions: Record<string, SessionRecord>;
};
