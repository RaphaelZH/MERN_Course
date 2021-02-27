import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Import SQLite API.
import * as SQLite from "expo-sqlite";

// Open a database, creating it if it doesn't exist,
// and return a Database object.
const db = SQLite.openDatabase("KanbanBoard.db");

class Items extends React.Component {
  state = {
    items: null,
  };

  componentDidMount() {
    const { to_show } = this.state;
  }

  render() {
    //-->
    const { items } = this.state;

    const { todo: todoBlock } = this.props;
    const { doing: doingBlock } = this.props;
    const { review: reviewBlock } = this.props;
    const { done: doneBlock } = this.props;

    let heading;
    let background_color;
    let font_color;
    let msg; //
    if (todoBlock === true) {
      heading = "Todo";
      background_color = "red";
      font_color = "white";
      msg = true;
      this.to_show = this.todoUpdate();
    } else if (doingBlock === true) {
      heading = "Doing";
      background_color = "blue";
      font_color = "snow";
      msg = true; //
      this.to_show = this.doingUpdate();
    } else if (reviewBlock === true) {
      heading = "Review";
      background_color = "yellow";
      font_color = "red";
      msg = true; //
      this.to_show = this.reviewUpdate();
    } else if (doneBlock === true) {
      heading = "Done";
      background_color = "orange";
      font_color = "whitesmoke";
      msg = true; //
      this.to_show = this.doneUpdate();
    }

    if (items === null || items.length === 0) {
      return null;
    }

    return (
      //style
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>{heading}</Text>
        {items.map(({ id, todo, doing, review, done, task }) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
            style={{
              backgroundColor: background_color,
              borderColor: "#000",
              borderWidth: 1,
              padding: 8,
            }}
          >
            <Text style={{ color: font_color }}>
              {[todo + " " + doing + " " + review + " " + done + " " + task]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  todoUpdate() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM status WHERE todo = 1;",
        null,
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }

  doingUpdate() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM status WHERE doing = 1;",
        //[this.props.review ? 1 : 0],
        null,
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }

  reviewUpdate() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM status WHERE review = 1;",
        //[this.props.done ? 1 : 0],
        null,
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }

  doneUpdate() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM status WHERE done = 1;",
        //[this.props.done ? 1 : 0],
        null,
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}

export default Items;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});
