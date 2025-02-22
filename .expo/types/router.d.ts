/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/component/AddDonatefood` | `/component/AddPost` | `/component/AddStory` | `/component/FoodDonate` | `/component/Invoice` | `/component/Post` | `/component/footer` | `/component/header` | `/component/stoty` | `/layout` | `/pages/About` | `/pages/Activevolunteer` | `/pages/ChangePassword` | `/pages/Login` | `/pages/Post` | `/pages/Profile` | `/pages/Setiins` | `/pages/Singup` | `/pages/UpdateProfile` | `/pages/Volunteer` | `/pages/Wallet` | `/pages/home`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
