export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  participants: PollParticipant[];
  closed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PollOption {
  id: string;
  name: string;
}

export interface PollParticipant {
  id: string;
  name: string;
  selectedOptions: string[];
}
