import { isRedirectError } from 'next/dist/client/components/redirect';
import { ActionHandler } from '@/types/action';

export function actionErrorHandler<TFormDataSchema, TResultData>(
  action: ActionHandler<TFormDataSchema, TResultData>,
): ActionHandler<TFormDataSchema, TResultData> {
  return async (prevState, formData) => {
    try {
      return await action(prevState, formData);
    } catch (error: any) {
      if (isRedirectError(error)) {
        throw error;
      }
      console.error(`Failed to execute action: ${error.message}`);
      return { serverError: 'Failed to execute action' };
    }
  };
}
