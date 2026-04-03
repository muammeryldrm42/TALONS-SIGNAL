import { Quest, SignalCardData } from "@/lib/types";

export const defaultSignals: SignalCardData[] = [
  { id: "1", name: "rush", handle: "@rush", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=rush", change: 2.01, tone: "up", size: "lg", sparkline: [6,4,5,4,4,5,4,5,6,10], badge: "LEADING" },
  { id: "2", name: "wake", handle: "@wake", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=wake", change: 1.83, tone: "up", size: "lg", sparkline: [7,6,5,5,4,4,4,6,5,9] },
  { id: "3", name: "Cassie Heart", handle: "@cassie", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cassie", change: 1.62, tone: "up", size: "lg", sparkline: [3,4,4,5,5,6,6,7,8,10], badge: "BREAKOUT" },
  { id: "4", name: "Antimo", handle: "@antimo", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=antimo", change: 1.46, tone: "up", sparkline: [1,1,1,2,1,1,2,2,3,7] },
  { id: "5", name: "max", handle: "@max", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=max", change: 1.31, tone: "up", sparkline: [1,1,1,1,2,2,2,3,3,8] },
  { id: "6", name: "Nick Tom.", handle: "@nick", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=nick", change: 1.26, tone: "up", sparkline: [1,1,1,2,2,3,3,4,5,9] },
  { id: "7", name: "Angel", handle: "@angel", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=angel", change: 1.19, tone: "up", sparkline: [4,2,3,2,5,3,6,4,5,7] },
  { id: "8", name: "poolside", handle: "@poolside", avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=poolside", change: 0.96, tone: "up", sparkline: [2,1,2,3,2,2,1,1,2,5] },
  { id: "9", name: "Icedtoad", handle: "@iced", avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=iced", change: 0.96, tone: "up", sparkline: [4,3,3,2,4,3,4,3,4,7] },
  { id: "10", name: "Nourish P.", handle: "@nourish", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=nourish", change: 0.91, tone: "up", sparkline: [2,2,1,2,2,3,2,3,4,7] },
  { id: "11", name: "kenny", handle: "@kenny", avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=kenny", change: -0.71, tone: "down", sparkline: [1,2,1,1,2,1,2,2,2,4] },
  { id: "12", name: "Kyle", handle: "@kyle", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=kyle", change: -0.67, tone: "down", sparkline: [2,2,2,2,1,1,2,2,3,5] },
  { id: "13", name: "Coop", handle: "@coop", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=coop", change: 0.75, tone: "neutral", sparkline: [3,2,4,2,5,3,4,3,4,5] },
  { id: "14", name: "stat.", handle: "@stat", avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=stat", change: 0.69, tone: "neutral", sparkline: [1,2,1,2,2,2,2,3,3,4] },
  { id: "15", name: "tenbie", handle: "@tenbie", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=tenbie", change: 0.67, tone: "neutral", sparkline: [4,3,3,2,2,2,2,2,3,6] }
];

export const rankingRows = [
  { rank: 1, name: "rush", handle: "@rush", score: "94.2", change: "+2.01%", tag: "Creator" },
  { rank: 2, name: "wake", handle: "@wake", score: "92.8", change: "+1.83%", tag: "Creator" },
  { rank: 3, name: "solo l2", handle: "@project", score: "90.5", change: "+12.7%", tag: "Project" },
  { rank: 4, name: "Cassie Heart", handle: "@cassie", score: "89.4", change: "+1.62%", tag: "Creator" },
  { rank: 5, name: "base builders", handle: "/base", score: "85.1", change: "+6.8%", tag: "Channel" }
];

export const radarItems = [
  { title: "Fast new breakout", value: "mintloop", meta: "+182% mentions" },
  { title: "Hot channel", value: "/founders", meta: "engagement spike" },
  { title: "Emerging project", value: "solo l2", meta: "most discussed" },
  { title: "Watch signal", value: "angel", meta: "7D acceleration" }
];

export function buildReferralQuest(referrals: number): Quest {
  return {
    id: "referral-quest",
    title: "Invite friends",
    description: "Share your link. Every unique referral credits 10 TS to your profile.",
    rewardTs: 10,
    progress: referrals,
    goal: 25,
    status: referrals >= 25 ? "completed" : "available"
  };
}
