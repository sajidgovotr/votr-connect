import { SnackbarMessage } from "@/components";
import React, { ReactNode, useState } from "react";

export const MessageContext = React.createContext({});

export const MessageConsumer = MessageContext.Consumer;
export const MessageProvider = MessageContext.Provider;

export interface IMessageContainer {
  children: ReactNode[] | ReactNode;
}

export interface IMessageContext {
  snackbarState: {
    isSnackbarVisible: boolean;
    snackBarMessage: string;
    snackBarDescription: string;
    variant: "error" | "warning" | "info" | "success";
    duration: number;
  };
  showSnackbar: (
    message: string,
    snackBarDescription: string,
    variant: "error" | "warning" | "info" | "success",
    duration?: number
  ) => void;
  hideSnackbar: () => void;
}

export const MessageContainer = ({
  children
}: IMessageContainer): ReactNode => {
  const [snackbarState, setSnackbarState] = useState({
    isSnackbarVisible: false,
    snackBarMessage: "",
    snackBarDescription: "",
    variant: "info",
    duration: 1000
  });

  const showSnackbar = (
    message: string,
    description: string,
    variant = "info",
    duration = 3000
  ): void => {
    setSnackbarState({
      isSnackbarVisible: true,
      snackBarMessage: message,
      snackBarDescription: description,
      variant,
      duration
    });
  };

  const hideSnackbar = (): void => {
    setSnackbarState({
      ...snackbarState,
      isSnackbarVisible: false,
      snackBarMessage: "",
      snackBarDescription: "",
      variant: "info"
    });
  };

  return (
    <MessageProvider
      value={{
        snackbarState,
        hideSnackbar,
        showSnackbar
      }}
    >
      {children}
      <SnackbarMessage />
    </MessageProvider>
  );
};
