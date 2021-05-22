import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("todos");

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .orderBy("updated", "desc")
      .onSnapshot((collection) => {
        const updatedNotes = collection.docs.map((doc) => {
          const noteObject = {
            ...doc.data(),
            id: doc.id,
          };
          console.log(noteObject);
          return noteObject;
        });
        setNotes(updatedNotes);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f55",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.text) {
      if (route.params.id == "none") {
        const newNote = {
          title: route.params.text,
          done: false,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          updated: firebase.firestore.FieldValue.serverTimestamp(),
        };
        //setNotes([...notes, newNote]);
        db.add(newNote);
      } else {
        console.log("Edit " + route.params.id);
        db.doc(route.params.id).update({
          title: route.params.text,
          updated: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Screen");
  }

  function editNote(id) {
    navigation.navigate("Edit Screen", { navigation, id });
  }

  // This deletes an individual note
  function deleteNote(id) {
    console.log("Deleting " + id);
    db.doc(id).delete();
    // To delete that item, we filter out the item we don't want
    //setNotes(notes.filter((item) => item.id !== id));
  }

  function setDoneNote(id, value) {
    console.log("Set Done status " + id + " to " + value);
    db.doc(id).update({
      done: value,
      updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // To delete that item, we filter out the item we don't want
    //setNotes(notes.filter((item) => item.id !== id));
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    if (item.done == false) {
      return (
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => editNote(item.id)}
            style={{ flex: 0.1 }}
          >
            <AntDesign name="check" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 0.8 }}
            onPress={() => setDoneNote(item.id, true)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteNote(item.id)}
            style={{ flex: 0.1 }}
          >
            <Ionicons name="trash" size={16} color="#944" />
          </TouchableOpacity>
        </View>
      );
    }
  }

  function renderDoneItem({ item }) {
    if (item.done == true) {
      return (
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "gray",
          }}
        >
          <TouchableOpacity
            onPress={() => editNote(item.id)}
            style={{ flex: 0.1 }}
          >
            <AntDesign name="check" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 0.8 }}
            onPress={() => setDoneNote(item.id, false)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteNote(item.id)}
            style={{ flex: 0.1 }}
          >
            <Ionicons name="trash" size={16} color="#944" />
          </TouchableOpacity>
        </View>
      );
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { justifyContent: "flex-start" },
      ]}
    >
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
      <FlatList
        data={notes}
        renderItem={renderDoneItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});
