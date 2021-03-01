import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import { theme } from "../core/theme";

// Import SQLite API.
import * as SQLite from "expo-sqlite";

// Open a database, creating it if it doesn't exist,
// and return a Database object.
const db = SQLite.openDatabase("KanbanBoard.db");

export default class Tasks extends React.Component {
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
    if (todoBlock === true) {
      heading = "Todo";
      background_color = theme.colors.YUHONG;
      font_color = theme.colors.DANQINGZI;
      this.to_show = this.todoUpdate();
    } else if (doingBlock === true) {
      heading = "Doing";
      background_color = theme.colors.MEIGUIHONG;
      font_color = theme.colors.DANQINGZI;
      this.to_show = this.doingUpdate();
    } else if (reviewBlock === true) {
      heading = "Review";
      background_color = theme.colors.QINGLIAN;
      font_color = theme.colors.DANQINGZI;
      this.to_show = this.reviewUpdate();
    } else if (doneBlock === true) {
      heading = "Done";
      background_color = theme.colors.TENGLUOZI;
      font_color = theme.colors.DANQINGZI;
      this.to_show = this.doneUpdate();
    }

    if (items === null || items.length === 0) {
      return null;
    }

    return (
      //style
      <View>
        <Header style={styles.header}>{heading}</Header>
        {items.map(({ id, todo, doing, review, done, task }) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem(id)}
            style={[
              styles.task_button,
              {
                backgroundColor: background_color,
              },
            ]}
          >
            <Text
              style={[
                styles.task,
                {
                  color: font_color,
                },
              ]}
            >
              {[task]}
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

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: theme.colors.secondary,
    fontWeight: "bold",
    paddingVertical: 8,
    textAlign: "center",
  },
  task_button: {
    width: "100%",
    marginVertical: 2,
    paddingVertical: 2,
    borderColor: "silver",
    borderWidth: 1,
    padding: 8,
    alignContent: "flex-start",
    borderRadius: 8,
    alignSelf: "center",
  },
  task: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 32,
    textAlign: "left",
    alignSelf: "flex-start",
  },
});
