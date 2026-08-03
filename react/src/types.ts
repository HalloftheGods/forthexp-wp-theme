export interface GamificationAction {
  id: string;
  name: string;
  xpReward: number;
  apReward?: number;
  gpReward?: number;
  description: string;
  iconName: string;
}

export interface GPItem {
  id: string;
  name: string;
  cost: number;
  description: string;
  iconName: string;
  color: string;
}

export interface APAbility {
  id: string;
  name: string;
  maintenanceCost: number;
  description: string;
  iconName: string;
  color: string;
}

export interface EngineState {
  level: number;
  current_xp: number;
  target_xp: number;
  total_xp: number;
  total_ap: number;
  total_gp: number;
  title: string;
  stats: Record<string, number>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requiredXp: number;
  iconName: string;
  unlockedAt?: string;
  color: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  xpAdded?: number;
  apAdded?: number;
  gpAdded?: number;
  type: 'xp_gain' | 'level_up' | 'achievement_unlocked' | 'api_call';
  payload?: any;
}

export type CodeTab = 'js' | 'php' | 'shortcode' | 'curl';

export interface SnippetParameters {
  userId: string;
  actionKey: string;
  xpAmount: number;
  apAmount: number;
  gpAmount: number;
  badgeName: string;
  badgeIcon: string;
  theme: 'dark' | 'light' | 'emerald';
}
