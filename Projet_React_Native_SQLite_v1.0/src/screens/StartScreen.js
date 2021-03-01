import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { theme } from "../core/theme";

const StartScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Kanban Board App</Header>
    <Paragraph>The easiest way to keep track of your workflow.</Paragraph>
    <Button
      mode="contained"
      onPress={() => navigation.navigate("KanbanBoardScreen")}
    >
      View your workflow
    </Button>
    <View style={styles.row}>
      <Text>Information of the author? </Text>
      <TouchableOpacity onPress={() => navigation.replace("ProfileScreen")}>
        <Text style={styles.link}>Please click here.</Text>
      </TouchableOpacity>
    </View>
  </Background>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default StartScreen;
