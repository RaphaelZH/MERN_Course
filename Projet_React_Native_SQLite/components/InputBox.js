import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const InputBox = () => {
  const [text, setText] = useState();
  return (
    <View style={{ width: "80%", marginBottom: 60 }}>
      <Text style={[styles.align, styles.font]}>{title}</Text>
      <View>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button title="Chang me" onPress={addItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  align: {
    alignSelf: "center",
  },
  font: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
});

export default InputBox;
