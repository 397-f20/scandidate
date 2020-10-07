# Scandidate APP

```bat
$ npm install expo // in project folder level
$ npm install react-native-paper 
```
Screens and navigation
```bat
$ expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
$ expo install @react-navigation/native @react-navigation/stack
```

### getting started for firebase
```bat
$ npm install -g firebase-tools
$ expo install firebase
$ npx expo-optimize
$ expo build:web
//to test  
$ npx serve web-build 
$ firebase serve --only hosting
```

add the following in package.json
```bat
"scripts": {
  /* ... */
  "predeploy": "expo build:web",
  "deploy-hosting": "npm run predeploy && firebase deploy --only hosting",
}
```

in firebase.json
```bat
//redirecting to the App.js rather than the default public/index.html
"hosting": {
    "public": "web-build",
}
```
