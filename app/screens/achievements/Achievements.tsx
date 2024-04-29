import { ScrollView } from "react-native";
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
    </ScrollView>
  );
};

export default Achievements;
