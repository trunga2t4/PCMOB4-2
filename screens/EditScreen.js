import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("todos");

export default function EditScreen({ route, navigation }) {
  const [text, setText] = useState("");
  const id = route.params.id;

  useEffect(() => {
    db.doc(id)
      .get()
      .then((doc) => {
        const dbItem = doc.data();
        console.log(dbItem.title);
        setText(dbItem.title);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FontAwesome5 name="chess-queen" size={120} color="navy" />
      </View>
      <Text style={styles.title}>What do you want to change, dear?</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(input) => setText(input)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notes", { text, id })}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notes")}
        >
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    padding: 10,
    marginTop: 20,
    fontSize: 24,
    fontWeight: "700",
    color: "navy",
  },
  textInput: {
    borderColor: "navy",
    backgroundColor: "white",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
    fontSize: 18,
  },
  button: {
    padding: 10,
    backgroundColor: "navy",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 120,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffc",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
