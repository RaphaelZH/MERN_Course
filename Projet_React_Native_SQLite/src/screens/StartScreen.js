import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";




const StartScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Kanban Board App</Header>
    <Paragraph>The easiest way to keep track of your workflow.</Paragraph>
    <Button
      mode="contained"
      onPress={() => navigation.navigate("KanbanBoardScreen")}
    >View your workflow
    </Button>
  </Background>
);

export default StartScreen;
