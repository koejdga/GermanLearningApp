import { ScrollView, Text, View } from "react-native";
import Achievement from "../../ui_elements/achievements_page/Achievement";

const Achievements = () => {
  return (
    <ScrollView>
      <Achievement title="30 нових слів" totalAmount={30} currentAmount={10} />
      <Achievement
        title="5 виконаних вправ"
        totalAmount={5}
        currentAmount={1}
      />
      <Achievement
        title="5 ідеально виконаних вправ"
        totalAmount={30}
        currentAmount={10}
      />
      <View
        style={{
          padding: 20,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontSize: 19,
            fontWeight: "500",
          }}
        >
          Виконані
        </Text>
      </View>
      <Achievement title="30 нових слів" completed={true} />
      <Achievement title="5 виконаних вправ" completed={true} />
      <Achievement title="5 ідеально виконаних вправ" completed={true} />
    </ScrollView>
  );
};

export default Achievements;
