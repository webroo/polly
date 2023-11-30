import { isRedirectError } from 'next/dist/client/components/redirect';
import { ActionHandler } from '@/types/action';

/**
 * Used to wrap action handlers and ensure any uncaught errors are returned as
 * ActionResult objects. This standardises the error handling behaviour between
 * javascript enabled and disabled browsers.
 *
 * For background context: if an action handler throws an error in a javascript-
 * enabled browser then the error is re-thrown on the client-side, however in a
 * javascript-disabled browser the POST request that executes the action will
 * fail and return a 500. Using this function ensures an ActionResult is provided
 * in both circumstances instead.
 *
 * @param action An action handler function
 * @returns A function that executes the provided action
 */
export function actionErrorHandler<TFormDataSchema, TResultData>(
  action: ActionHandler<TFormDataSchema, TResultData>,
): ActionHandler<TFormDataSchema, TResultData> {
  return async (prevState, formData) => {
    try {
      return await action(prevState, formData);
    } catch (error: any) {
      // Ensure errors thrown by the nextjs redirect() method are re-thrown.
      if (isRedirectError(error)) {
        throw error;
      }
      console.error(`Failed to execute action: ${error.message}`);
      return { serverError: 'Failed to execute action' };
    }
  };
}
