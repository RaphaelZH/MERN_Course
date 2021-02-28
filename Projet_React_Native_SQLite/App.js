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

import Items from "./components/Items";


// Open a database, creating it if it doesn't exist,
// and return a Database object.
const db = SQLite.openDatabase("KanbanBoard.db");

export default class App extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    // Check if the items table exists if not create it
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS status (id INTEGER PRIMARY KEY NOT NULL, todo	INTEGER, doing	INTEGER, review	INTEGER, done	INTEGER, task	TEXT);"
      );
    });
    //this.fetchData() // ignore it for now
  }*/

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
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>SQLite Example</Text>

        <View style={styles.flexRow}>
          <TextInput
            onChangeText={(text) => this.setState({ text })}
            onSubmitEditing={() => {
              this.add(this.state.text);
              this.setState({ text: null });
            }}
            placeholder="Do you want to add a new task?"
            style={styles.input}
            value={this.state.text}
          />
        </View>

        <ScrollView style={[styles.listArea, { flex: 1 }]}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text>AAAAA</Text>
              <Items
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
            </View>
            <View style={{ flex: 1 }}>
              <Text>BBBBB</Text>
              <Items
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
            </View>
            <View style={{ flex: 1 }}>
              <Text>CCCC</Text>
              <Items
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
            </View>
            <View style={{ flex: 1 }}>
              <Text>DDDD</Text>
              <Items
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
            </View>
          </View>
        </ScrollView>
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
        /*tx.executeSql("SELECT * FROM status", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );*/
        tx.executeSql(
          "SELECT * FROM status",
          null,
          (txObj, { rows }) => console.log(JSON.stringify(rows))

          // passing sql query and parameters: null
          // success callback which sends two things Transaction object and ResultSet Object

          // failure callback which sends two things Transaction object and Error
          //(txObj, error) => console.log('Error ', error)
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
