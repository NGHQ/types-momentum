import {
  TipStoryCategory, 
  TipGenre
} from '../../enum';
import { 
  UserId,
  PollId, 
  Flavor,
  TipId,
  Immutable,
  CommunityId,
  Timestamp
 } from '../utility';

export type TipDocumentData = Immutable<{
  title: string;
  stories: TipStory[];
  genres: TipGenre[];
  communities: CommunityId[];
  globallyAvailable: boolean;
  createdAt: Timestamp;
  responseCount: number;
}>; 

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

export type ChoiceId = Flavor<string, 'ChoiceId'>;
export type PollChoice = {
  id: ChoiceId;
  choice: string;
}

export type PollDocumentData = Immutable<{
  survey: string;
  totalVotes: number;
  results: Record<ChoiceId, PollChoiceResult>;
  ofTipId: TipId;
}>

export type PollChoiceResult = PollChoice & {
  votes: number;
  voters: UserId[];
}