import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./NotesScreen";
import EditScreen from "./EditScreen";

const InnerStack = createStackNavigator();
export default function NotesStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          title: "Notes, Requestes and More...",
          headerStyle: {
            backgroundColor: "navy",
            height: 100,
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 5,
          },
          headerTintColor: "#ffc",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
      <InnerStack.Screen
        name="Edit Screen"
        component={EditScreen}
        options={{
          headerShown: false,
          title: "Edit Note",
        }}
      />
    </InnerStack.Navigator>
  );
}
