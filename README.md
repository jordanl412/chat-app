# Chat App
## Intro
Chat App is a mobile app created for Android and iOS using React Native. It allows users to send messages, photos, and their location.
## Tech Stack
Technologies used:
- React Native
- Expo
- Google Firestore Database
- Anonymous Authentication through Google Firebase authentication
- Gifted Chat library
- Xcode Simulator (for testing/emulating)
## Key Features
- A page where users can enter their name and choose a background color for the chat screen before joining the chat
- A page displaying the conversation, as well as an input field and send button
- The chat provides users with two additional communication features: sending images and location data
- Data is stored online and offline
## Setting up the Development Environment
1. Clone the repository: `git clone https://github.com/jordanl412/chat-demo.git`
2. Install Expo CLI as a global npm package: `npm install -g expo-cli`
3. Install all project dependencies: `npm install`
4. Create an Expo account [here](https://expo.dev/), and login via your terminal with `expo login`
5. Follow Expo CLI's instructions (will differ based on your preferred simulator - Xcode, Android Studio, or the Expo Go mobile app)
6. Start the project with the command `expo start`
## Database Configuration
1. Go to https://firebase.google.com/ and sign in with your existing Google account (or create a new Google account)
2. Go to Firebase Console, and click on "Create Project"
3. Once on the project dashboard, click on "Develop" on the left, then "Cloud Firestore", then "Create Database". Follow the instructions, selecting "Test Mode"
4. Create a new collection called "Messages"
5. Under "Project Settings", scroll down and click "Firestore for Web" (the </> icon)
6. Choose a name for your chat app, then click "Register". Copy the configuration code provided to the App.js file in the cloned repository. Replace the following with your configuration code:
```
const firebaseConfig = {
    apiKey: "YOUR CODE",
    authDomain: "YOUR CODE",
    projectId: "YOUR CODE",
    storageBucket: "YOUR CODE",
    messagingSenderId: "YOUR CODE",
    appId: "YOUR CODE"
  };
```
7. To upload photos, go to "Storage" on the left, then go to the "Rules" tab. Change `allow read, write: if false;` to `allow read, write: if true;`
## Dependencies
```
 "@react-navigation/native": "^6.1.6",
 "@react-navigation/native-stack": "^6.9.12",
 "expo": "~48.0.9",
 "expo-status-bar": "~1.4.4",
 "firebase": "^9.13.0",
 "react": "18.2.0",
 "react-native": "0.71.4",
 "react-native-gifted-chat": "^2.0.1",
 "@react-native-async-storage/async-storage": "1.17.11",
 "@react-native-community/netinfo": "9.3.7",
 "expo-image-picker": "~14.1.1",
 "expo-media-library": "~15.2.3",
 "expo-location": "~15.1.1",
 "react-native-maps": "1.3.2"
```
## Getting Started
To install packages, see listed dependencies above (included in the package.json file). Run the project with the command `expo start`. Tests are run with Xcode Simulator.
