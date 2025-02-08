import { StatusBar } from "react-native";
import { NativeRouter } from "react-router-native";
import Layout from "./layout";
import Header from "./component/header";
import Footer from "./component/footer";

export default function App() {
  return (
    <NativeRouter>
      {/* Correct way to set status bar color */}
      <StatusBar backgroundColor="#545955" barStyle="light-content" />

      <Header />
      <Layout />
      <Footer />
    </NativeRouter>
  );
}
