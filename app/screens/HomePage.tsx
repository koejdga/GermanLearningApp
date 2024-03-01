import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import Navigation from "../ui_elements/Navigation";
import { generalStyles } from "../config/General";
import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";
import Task from "../ui_elements/home_page/Task";
import Icon from "react-native-vector-icons/Entypo";
import Achievement from "../ui_elements/home_page/Achievement";

interface Props {
  onGameStart: () => void;
}

const HomePage: React.FC<Props> = ({ onGameStart }) => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {/* This is something like header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/app-logo.png")}
          style={{ width: 70, height: 70 }}
        />
        <Text style={generalStyles.score}>100</Text>
      </View>

      {/* This is something like body */}
      <ScrollView style={styles.body}>
        <View style={{ height: 57 }}></View>
        <Text style={styles.title}>Для Вас</Text>
        <View style={styles.tasks}>
          <View style={styles.tasksRow}>
            <Task
              title="Дієслова"
              background={require("../assets/tasks_backgrounds/pastel-gradient-bg.jpg")}
            ></Task>
            <Task
              title="Артиклі"
              contrastForTitle={true}
              background={require("../assets/tasks_backgrounds/flowers7.jpeg")}
            ></Task>
          </View>
          <View style={styles.tasksRow}>
            <Task
              title="Нові слова"
              contrastForTitle={true}
              background={require("../assets/tasks_backgrounds/pink-flowers.png")}
            ></Task>
            <Task
              title="Діалог"
              background={require("../assets/tasks_backgrounds/yellow-bg.jpeg")}
            ></Task>
          </View>
        </View>
        <Icon
          name="dot-single"
          size={22}
          color="#666666"
          style={styles.navigationDot}
        ></Icon>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 15,
          }}
        >
          <Text style={[styles.title, { marginTop: 33 }]}>Досягнення</Text>
          <Icon name="dots-three-horizontal" size={28}></Icon>
        </View>
        <View style={{ gap: 22 }}>
          <Achievement description="30 нових слів"></Achievement>
          <Achievement description="30 нових слів"></Achievement>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 34,
  },
  tasks: {
    marginTop: 27,
    gap: 30,
  },
  tasksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
  navigationDot: {
    alignSelf: "center",
    marginTop: 13,
  },
});

export default HomePage;