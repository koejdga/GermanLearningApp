import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "../UserProfile";
import EditUserProfile from "./EditUserProfile";
const Stack = createNativeStackNavigator();

const UserProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default UserProfileStack;
