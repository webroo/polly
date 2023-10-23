import { ObjectId } from 'mongodb';

export interface PollOptionModel {
  _id: ObjectId;
  name: string;
}

export interface ParticipantModel {
  _id: ObjectId;
  name: string;
  selectedOptions: string[];
}

export interface PollModel {
  _id: ObjectId;
  title: string;
  description: string;
  options: PollOptionModel[];
  participants: ParticipantModel[];
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
