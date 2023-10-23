export interface PollModel {
  id: string;
  title: string;
  description: string;
  options: PollOptionModel[];
  participants: ParticipantModel[];
}

export interface PollOptionModel {
  id: string;
  name: string;
}

export interface ParticipantModel {
  id: string;
  name: string;
  selectedOptions: string[];
}

export interface NewPoll {
  title: string;
  description: string;
  options: string[];
}

export interface NewParticipant {
  name: string;
  selectedOptions: string[];
}
