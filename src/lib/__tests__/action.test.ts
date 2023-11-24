import { ActionHandler } from '@/types/action';
import { actionErrorHandler } from '../action';
import { redirect } from 'next/navigation';

describe('actionErrorHandler', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('executes the wrapped action function and returns the result', async () => {
    const originalAction: ActionHandler<any, any> = async () => ({
      data: 'foo',
    });

    const wrappedAction = actionErrorHandler(originalAction);

    expect(await wrappedAction({}, new FormData())).toEqual({
      data: 'foo',
    });
  });

  it('catches errors thrown from within the action function and returns an ActionResult', async () => {
    const originalAction: ActionHandler<any, any> = async () => {
      throw new Error('foo');
    };

    const wrappedAction = actionErrorHandler(originalAction);

    expect(await wrappedAction({}, new FormData())).toEqual({
      serverError: 'Failed to execute action',
    });
  });

  it('re-throws the nextjs redirect error if redirect() is called from within the action', async () => {
    const originalAction: ActionHandler<any, any> = async () => {
      redirect('/foo');
    };

    const wrappedAction = actionErrorHandler(originalAction);

    await expect(wrappedAction({}, new FormData())).rejects.toThrow(
      'NEXT_REDIRECT',
    );
  });
});
