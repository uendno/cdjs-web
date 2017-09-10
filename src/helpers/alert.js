import Alert from 'react-s-alert';

export const showError = (title = 'Oops!', message) => {
    Alert.error(message, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none',
        customFields: {
            title
        }
    });
};