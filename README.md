# 21001781 Tran Le Thien Tri

Project Mobile
Trước khi bắt đầu, hãy đảm bảo rằng bạn đã cài đặt các công cụ sau:

-   **Mobile simulator**: Bạn có thể tải và cài đặt từ link sau đây [chromewebstore](https://chromewebstore.google.com/detail/mobile-simulator-responsi/ckejmhbmlajgoklhgbapkiccekfoccmk)
-   **Node.js**: Bạn có thể tải và cài đặt từ [nodejs.org](https://nodejs.org/).
-   **Expo CLI**: Cài đặt Expo CLI toàn cục bằng cách chạy lệnh sau:

    ```bash
    npm install -g expo-cli
    npx create-expo-app YOUR_PROJECT --template blank
    cd YOUR_PROJECT
    npx expo install react-dom react-native-web @expo/metro-runtime

    ```

-   **HƯỚNG DẪN CLONE VA CHẠY PROJECT TRÊN VSCODE**:

    ````bash
    git clone https://github.com/ThenTrees/video-sharing-app.git
    vào VSC chọn open folder chọn thư mục vừa clone về
    npm i
    npm start -> w
    ```
    ````

-   navigation:
    npm install @react-navigation/native @react-navigation/native-stack
    npx expo install react-native-screens react-native-safe-area-context
-   run on web with mobile simulator
    npx expo install react-native-web react-dom @expo/metro-runtime
-   video
    npx expo install expo-av
-   datetime
    npm install react-native-modal-datetime-picker
    npm install @react-native-community/datetimepicker
