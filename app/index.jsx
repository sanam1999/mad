import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NativeRouter } from "react-router-native"; 
import Layout from "./layout";
import Header from "./component/header";
import Footer from "./component/footer";

export default function App() {
  


  return (
    <NativeRouter>
      <Header />
      <Layout />
      <Footer />
      <StatusBar style="auto" />
    </NativeRouter>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


