import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
const TabIcon = ({
  icon,
  name,
  focused,
  Type,
  color,
}: {
  icon: "home" | "add-circle";
  name: string;
  focused: boolean;
  color?: string;
  Type: React.ElementType;
}) => {
  return (
    <View className="flex items-center justify-center py-4 flex-col  ">
      <Type size={30} name={icon} color="#33363F" />

      <Text
        className={`${focused ? "font-bold" : "font-normal"} text-lg`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#001",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 65,
          paddingVertical: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              icon="home"
              name="home"
              focused={focused}
              Type={Entypo}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          title: "create-post",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              icon="add-circle"
              name="create-post"
              focused={focused}
              Type={Ionicons}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
