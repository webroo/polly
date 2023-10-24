export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  participants: PollParticipant[];
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
