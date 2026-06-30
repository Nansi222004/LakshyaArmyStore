// Stubbed Firebase configuration
// We are no longer using the old Mynzo Firebase project.

export const messaging = null;

export const requestFcmToken = async () => {
  console.log('Firebase Cloud Messaging is disabled for Lakshya Army Store.');
  return null;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    // Never resolves
  });

export const onMessage = () => {
  return () => {}; // Return dummy unsubscribe function
};
