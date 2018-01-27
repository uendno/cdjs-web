import Alert from 'react-s-alert';

// eslint-disable-next-line
export const showError = (title = 'Oops!', message) => {
  Alert.error(message, {
    position: 'bottom-right',
    effect: 'slide',
    timeout: 10000000,
    customFields: {
      title,
    },
  });
};