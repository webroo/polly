import { connectDB } from '@/lib/mongodb';
import { uniqueid } from '@/lib/uniqueid';
import { PollParticipant, Poll, PollOption } from '@/types/poll';

export async function getPoll(id: string): Promise<Poll | null> {
  return (await connectDB())
    .collection('polls')
    .findOne<Poll>({ id }, { projection: { _id: 0 } });
}

export async function getPolls(): Promise<Poll[]> {
  return (await connectDB())
    .collection('polls')
    .find<Poll>({}, { projection: { _id: 0 } })
    .toArray();
}

export async function createPoll(
  title: string,
  description: string,
  options: PollOption[],
): Promise<string> {
  const poll: Poll = {
    id: uniqueid(),
    title,
    description,
    participants: [],
    options: options.map(option => ({ ...option, id: uniqueid() })),
  };

  await (await connectDB())
    .collection('polls')
    .insertOne(poll, { forceServerObjectId: true });

  return poll.id;
}

export async function udpatePoll(
  pollId: string,
  title: string,
  description: string,
  options: PollOption[],
): Promise<string> {
  const optionsWithIds: PollOption[] = options.map(option => ({
    ...option,
    id: option.id || uniqueid(),
  }));

  await (await connectDB())
    .collection('polls')
    .updateOne(
      { id: pollId },
      { $set: { title, description, options: optionsWithIds } },
    );

  return pollId;
}

export async function addParticipant(
  pollId: string,
  name: string,
  selectedOptions: string[],
): Promise<PollParticipant> {
  const participant: PollParticipant = {
    id: uniqueid(),
    name,
    selectedOptions,
  };

  await (await connectDB())
    .collection('polls')
    .updateOne({ id: pollId }, { $push: { participants: participant } });

  return participant;
}

export async function updateParticipant(
  pollId: string,
  participantId: string,
  name: string,
  selectedOptions: string[],
): Promise<PollParticipant> {
  const participant: PollParticipant = {
    id: participantId,
    name,
    selectedOptions,
  };

  await (await connectDB()).collection('polls').updateOne(
    { id: pollId, 'participants.id': participant.id },
    {
      $set: {
        'participants.$.name': participant.name,
        'participants.$.selectedOptions': participant.selectedOptions,
      },
    },
  );

  return participant;
}

export async function deleteParticipant(
  pollId: string,
  participantId: string,
): Promise<boolean> {
  await (await connectDB())
    .collection('polls')
    .updateOne(
      { id: pollId },
      { $pull: { participants: { id: participantId } } },
    );

  return true;
}
