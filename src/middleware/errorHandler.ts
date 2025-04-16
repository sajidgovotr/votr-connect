import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

const getErrorMessage = (error: { data?: { message?: string }, message?: string }): string => {
    if (!error) return 'Please try again later';
    if (typeof error === 'string') return error;
    if (error.data?.message) return error.data.message;
    if (error.message) return error.message;
    return 'Please try again later';
};

export const errorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action: unknown) => {
    if (isRejectedWithValue(action)) {
        const typedAction = action as { payload: { data?: { message?: string }, message?: string } };
        // Get the store's state
        const state = api.getState();
        // Access the MessageContext from the store if available
        const messageContext = state?.messageContext;
        if (messageContext?.showSnackbar) {
            const errorMessage = getErrorMessage(typedAction.payload);
            messageContext.showSnackbar('Error', errorMessage, 'error');
        }
    }
    return next(action);
}; 