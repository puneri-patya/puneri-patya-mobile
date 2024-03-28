import { MessageType, showMessage } from "react-native-flash-message";

export const showSuccessMessage = (message: string, description?: string) => {
    displayMessage(message, 'success', description);
}

export const showErrorMessage = (message: string, description?: string) => {
    displayMessage(message, 'danger', description);
}

export const showWarningMessage = (message: string, description?: string) => {
    displayMessage(message, 'warning', description);
}

const displayMessage = (message: string, type: MessageType, description?: string) => {
    showMessage({
        message: message,
        description: description,
        type: type,
        duration: 3000,
        icon: { icon: type, position: 'left', props: {} }
    });
}