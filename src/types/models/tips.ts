import {
  TipStoryCategory, 
} from '../../enum';
import { 
  UserId,
  PollId, 
  GenreId,
  Flavor,
  TipId,
  CommunityId,
  Timestamp,
 } from '../utility';

export type TipDocumentData = {
  title: string;
  isDraft: boolean;
  stories: TipStory[];
  genres: Record<GenreId, {
    title: string;
    rank: number;
  }>;
  communities: CommunityId[];
  globallyAvailable: boolean;
  createdAt: Timestamp;
  responseCount: number;
  thumbnailUrl: string;
}; 

export type TipStory = HyperTextTipStory | VideoTipStory | PollTipStory | VectorGraphicTipStory;

export type HyperTextTipStory = {
  category: TipStoryCategory.HTML;
  html: string;
}

export type VideoTipStory = {
  category: TipStoryCategory.VIDEO;
  sourceUrl: string;
}

export type PollTipStory = {
  category: TipStoryCategory.POLL;
  survey: string; 
  choices: PollChoice[];
  resultsId: PollId;
}

export type VectorGraphicTipStory = {
  category: TipStoryCategory.SVG;
  sourceUrl: string;
}

export type SurveyTipStory = {
  category: TipStoryCategory.EMT;
  rank: number;
  survey: string;
  genre: {
    genreId: GenreId;
    title: string;
    colorHex: string;
  }
}

/**
 * @description Psuedo ID: ChoiceId is not a document ID
 */
export type ChoiceId = Flavor<string, 'ChoiceId'>;
export type PollChoice = {
  id: ChoiceId;
  choice: string;
}

export type PollDocumentData = {
  survey: string;
  totalVotes: number;
  results: Record<ChoiceId, PollChoiceResult>;
  ofTipId: TipId;
};

export type PollChoiceResult = PollChoice & {
  votes: number;
  voters: UserId[];
}

export type GenreDocumentData = {
  title: string;
  thumbnailUrl: string;
  creatorId: UserId;
  createdAt: Timestamp;
  tipsCount: number;
  colorHex: string;
} & (
  {
    globallyAvailable: true;
    exclusiveToCommunities: ['global'];
  } 
  |
  {
    globallyAvailable: false;
    exclusiveToCommunities: CommunityId[];
  }
);

export type UserSurveyDocument = SurveyTipStory;
export type UserSurveyChoice = 1 | 2 | 3 | 4 | 5 | 6 | 7;