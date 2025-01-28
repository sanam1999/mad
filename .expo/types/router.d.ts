/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/component/AddStory` | `/component/Invoice` | `/component/Post` | `/component/footer` | `/component/header` | `/component/stoty` | `/layout` | `/pages/About` | `/pages/ChangePassword` | `/pages/Login` | `/pages/Post` | `/pages/Profile` | `/pages/Setiins` | `/pages/Singup` | `/pages/Solution` | `/pages/UpdateProfile` | `/pages/Wallet` | `/pages/home`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
