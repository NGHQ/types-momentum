import {
  TipStoryCategory
} from '../../enum';
import { 
  UserId,
  PollId, 
  Flavor,
  TipId,
  Immutable
 } from '../utility';

export type TipDocumentData = Immutable<{
  title: string;
  stories: TipStory[];
}>; 

export type TipStory = HyperTextTipStory | VideoTipStory | PollTipStory;

export type HyperTextTipStory = {
  category: TipStoryCategory.HTML;
  html: string
}

export type VideoTipStory = {
  category: TipStoryCategory.VIDEO;
  sourceUrl: string;
}

export type PollTipStory = {
  category: TipStoryCategory.POLL;
  resultsId: PollId;
  choices: PollChoice[];
}

export type ChoiceId = Flavor<string, 'ChoiceId'>;
export type PollChoice = {
  id: ChoiceId;
  choice: string;
}

export type PollDocumentData = Immutable<{
  totalVotes: number;
  results: Record<ChoiceId, PollChoiceResult>;
  ofTipId: TipId;
}>

export type PollChoiceResult = PollChoice & {
  votes: number;
  voters: UserId[];
}