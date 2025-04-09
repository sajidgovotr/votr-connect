import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useContext, useEffect } from 'react';
import { MessageContext, IMessageContext } from '@/context/message-context';

interface QueryError {
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
}

const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
    if (!error) return 'Please try again later';
    if ('data' in error) {
        if (typeof error.data === 'object' && error.data !== null && 'message' in error.data) {
            return (error.data as { message: string }).message;
        }
    }
    if ('message' in error) {
        return error.message || 'Please try again later';
    }
    return 'Please try again later';
};

export const useQueryErrorHandler = (queries: QueryError[], errorMessages: string[]) => {
    const { showSnackbar } = useContext(MessageContext) as IMessageContext;

    useEffect(() => {
        queries.forEach((query, index) => {
            if (query.isError) {
                showSnackbar(
                    errorMessages[index],
                    getErrorMessage(query.error),
                    'error'
                );
            }
        });
    }, [queries, errorMessages, showSnackbar]);
}; 