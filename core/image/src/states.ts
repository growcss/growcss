import { ReactNode } from 'react';
import { CandidateProps } from '../types';

type state = 'initial' | 'load' | 'loading' | 'loaded' | 'error' | 'offline';

export interface PictureStateType {
  loadState: state;
  srcSetWebpArray?: CandidateProps[];
  srcSetArray?: CandidateProps[];
  mediaSrcSetSources: [] | ReactNode[];
  mediaSrcSetWebpSources: [] | ReactNode[];
  supportsWebp: boolean;
}

export interface ImageStateType {
  loadState: state;
  possiblySlowNetwork: boolean;
  inViewport: boolean;
  seenBefore: boolean;
  online: boolean;
  connection?: {
    downlink: string; // megabits per second
    rtt: string; // ms
    effectiveType: string; // 'slow-2g', '2g', '3g', or '4g'
  };
  src: string;
  srcSetWebpArray?: CandidateProps[];
  srcSetArray?: CandidateProps[];
  hasWebp: boolean;
  placeholder?: string;
}
