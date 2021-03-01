import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";

// Import SQLite API.
import * as SQLite from "expo-sqlite";

import Tasks from "../components/Tasks";

// Open a database, creating it if it doesn't exist,
// and return a Database object.
const db = SQLite.openDatabase("KanbanBoard.db");

export default class KanbanBoardScreen extends React.Component {
  state = {
    text: null,
  };

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS status (id INTEGER PRIMARY KEY NOT NULL, todo	INTEGER, doing	INTEGER, review	INTEGER, done	INTEGER, task	TEXT);"
      );
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Header>Kanban Board App</Header>
          <TextInput
            label="New Task"
            onChangeText={(text) => this.setState({ text })}
            onSubmitEditing={() => {
              this.add(this.state.text);
              this.setState({ text: null });
            }}
            placeholder="Please add your new task here."
            value={this.state.text}
            autoCapitalize="none"
          />

          <ScrollView style={styles.tasksArea}>
            <Tasks
              todo={true}
              ref={(todo) => (this.todo = todo)}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(
                      "UPDATE status SET todo = 0, doing = 1, review = 0, done = 0 WHERE id = ?;",
                      [id]
                    );
                  },
                  null,
                  this.doing_update
                )
              }
            />
            <Tasks
              doing={true}
              ref={(doing) => (this.doing = doing)}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(
                      "UPDATE status SET todo = 0, doing = 0, review = 1, done = 0 WHERE id = ?;",
                      [id]
                    );
                  },
                  null,
                  this.review_update
                )
              }
            />
            <Tasks
              review={true}
              ref={(review) => (this.review = review)}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(
                      "UPDATE status SET todo = 0, doing = 0, review = 0, done = 1 WHERE id = ?;",
                      [id]
                    );
                  },
                  null,
                  this.done_update
                )
              }
            />
            <Tasks
              done={true}
              ref={(done) => (this.done = done)}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql("DELETE FROM status WHERE id = ?;", [id]);
                  },
                  null,
                  this.done_update
                )
              }
            />
          </ScrollView>
        </Background>
      </View>
    );
  }

  add = (text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    /// important
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO status (todo, doing, review, done, task) values (1, 0, 0, 0, ?)",
          [text]
        );
        tx.executeSql("SELECT * FROM status", null, (txObj, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      this.todo_update
    );
  };

  todo_update = () => {
    this.todo && this.todo.todoUpdate();
  };

  doing_update = () => {
    this.todo && this.todo.todoUpdate();
    this.doing && this.doing.doingUpdate();
  };

  review_update = () => {
    this.doing && this.doing.doingUpdate();
    this.review && this.review.reviewUpdate();
  };

  done_update = () => {
    this.review && this.review.reviewUpdate();
    this.done && this.done.doneUpdate();
  };
}

const styles = StyleSheet.create({
  tasksArea: {
    flex: 1,
    width: 300,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 8,
  },
});
