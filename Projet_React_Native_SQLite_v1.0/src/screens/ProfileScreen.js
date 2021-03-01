import React from "react";
import { StyleSheet } from "react-native";
import Background from "../components/Background";
import Profile from "../components/Profile";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { theme } from "../core/theme";

const ProfileScreen = ({ navigation }) => (
  <Background>
    <Profile />
    <Header>Hao ZHANG</Header>
    <Paragraph>
      Master student specialized in smart systems and IoT at CY Tech. Having a
      strong interest in data science and machine learning.
    </Paragraph>
    <Paragraph>
      Email: <Paragraph style={styles.link}>haozhang@me.com</Paragraph>
    </Paragraph>
    <Paragraph>
      <Paragraph>
        Homepage: <Paragraph style={styles.link}>haozhang.me</Paragraph>
      </Paragraph>
    </Paragraph>
    <Paragraph>
      <Paragraph>
        GitHub:{" "}
        <Paragraph style={styles.link}>https://github.com/RaphaelZH</Paragraph>
      </Paragraph>
    </Paragraph>
    <Paragraph>
      <Paragraph>
        LinkedIn:{" "}
        <Paragraph style={styles.link}>
          https://www.linkedin.com/in/hao-zhang-6b7008107
        </Paragraph>
      </Paragraph>
    </Paragraph>
    <Button
      mode="outlined"
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: "StartScreen" }],
        })
      }
    >
      Back home
    </Button>
  </Background>
);

const styles = StyleSheet.create({
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default ProfileScreen;
