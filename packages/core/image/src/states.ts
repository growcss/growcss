export type StateType = {
  loadState: 'initial' | 'load' | 'loading' | 'loaded' | 'error' | 'offline';
  connection?: {
    downlink: string; // megabits per second
    rtt: string; // ms
    effectiveType: string; // 'slow-2g', '2g', '3g', or '4g'
  };
  possiblySlowNetwork: boolean;
  seenBefore: boolean;
};
