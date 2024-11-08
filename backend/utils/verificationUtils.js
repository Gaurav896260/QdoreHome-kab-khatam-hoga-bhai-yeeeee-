// // utils/verificationUtils.js
// import twilio from "twilio";

// // Replace these with your actual Twilio account SID and auth token
// const accountSid = "AC45bda60ec453b01acd7b31b8a044ef75"; // This should start with "AC"
// const authToken = "917cba251c8858a9b16e986e20e19b95"; // Your Twilio Auth Token
// const client = twilio(accountSid, authToken);

// export const sendVerificationSMS = async (to, message) => {
//   try {
//     if (!to) {
//       throw new Error('The "to" parameter is required.');
//     }

//     await client.messages.create({
//       body: message,
//       from: "91625118331", // Your Twilio phone number
//       to: to, // The recipient's phone number
//     });
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// };
