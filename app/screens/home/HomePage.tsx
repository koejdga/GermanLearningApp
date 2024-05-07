import { Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  achievements,
  getNotCompletedAchievements,
} from "../../AchievementLogic";
import { Game } from "../../Game";
import { UserContext } from "../../UserContext";
import { generalStyles } from "../../config/General";
import AchievementView from "../../ui_elements/achievements_page/AchievementView";
import Task from "../../ui_elements/home_page/Task";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [notCompletedAchievements, _] = useState(
    getNotCompletedAchievements(user, achievements)
  );

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <SafeAreaView>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/app-logo.png")}
            style={{ width: 70, height: 70 }}
          />
          <Text style={generalStyles.score}>{user ? user.total_score : 0}</Text>
        </View>
      </SafeAreaView>

      {/* Body */}
      <ScrollView>
        <View style={styles.body}>
          <View style={{ height: 57 }}></View>
          <Text style={styles.title}>Для Вас</Text>
          <View style={styles.tasks}>
            <View style={styles.tasksRow}>
              <Task
                gameName={Game.ENDINGS}
                background={require("../../assets/tasks_backgrounds/pastel-gradient-bg.jpg")}
                onPress={() => nav.navigate(Game.ENDINGS)}
              ></Task>
              <Task
                gameName={Game.ARTICLE}
                contrastForTitle={true}
                background={require("../../assets/tasks_backgrounds/flowers7.jpeg")}
                onPress={() => nav.navigate(Game.ARTICLE)}
              ></Task>
            </View>
            <View style={styles.tasksRow}>
              <Task
                gameName={Game.DRAP_DROP}
                contrastForTitle={true}
                background={require("../../assets/tasks_backgrounds/pink-flowers.png")}
                onPress={() => nav.navigate(Game.DRAP_DROP)}
              ></Task>
              <Task
                gameName={Game.WRITE_TRANSLATION}
                background={require("../../assets/tasks_backgrounds/yellow-bg.jpeg")}
                onPress={() => nav.navigate(Game.WRITE_TRANSLATION)}
              ></Task>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 15,
            }}
          >
            <Text style={[styles.title, { marginTop: 33 }]}>Досягнення</Text>
          </View>
        </View>
        <View>
          {notCompletedAchievements.map((achievement, index) => {
            return (
              <AchievementView
                user={user}
                achievement={achievement}
                key={"notCompletedAchievements" + index}
              />
            );
          })}
          <View style={{ marginBottom: 15 }}></View>
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
    fontSize: 27,
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
