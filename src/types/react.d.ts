import 'react-dom';
import type { FormStatus } from 'react-dom';

// Temporary types for experimental features until they land in an official release
declare module 'react-dom' {
  function experimental_useFormState<State>(
    action: (state: State) => Promise<State>,
    initialState: State,
    permalink?: string,
  ): [state: State, dispatch: () => void];

  function experimental_useFormState<State, Payload>(
    action: (state: State, payload: Payload) => Promise<State>,
    initialState: State,
    permalink?: string,
  ): [state: State, dispatch: (payload: Payload) => void];

  function experimental_useFormStatus(): FormStatus;
}
