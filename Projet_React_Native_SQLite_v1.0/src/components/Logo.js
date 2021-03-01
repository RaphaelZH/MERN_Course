import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image source={require("../assets/kanban_board.png")} style={styles.logo} />
);

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 150,
    marginBottom: 8,
  },
});

export default Logo;
