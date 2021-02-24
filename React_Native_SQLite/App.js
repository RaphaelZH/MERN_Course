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

import * as SQLite from "expo-sqlite";

import TodoList from "./components/TodoList";

// Open a database, creating it if it doesn't exist,
// and return a Database object.
const db = SQLite.openDatabase("KanbanBoard.db");

class Items extends React.Component {
  state = {
    items: null,
  };

  //-->
  /*componentDidMount() {
    this.update();
  }*/

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
    let msg;
    if (todoBlock === true) {
      heading = "Todo";
      background_color = "red";
      font_color = "white";
      msg = true;
    } else if (doingBlock === true) {
      heading = "Doing";
      background_color = "blue";
      font_color = "snow";
      msg = true;
    } else if (reviewBlock === true) {
      heading = "Review";
      background_color = "yellow";
      font_color = "red";
      msg = true;
    } else if (doneBlock === true) {
      heading = "Done";
      background_color = "orange";
      font_color = "whitesmoke";
      msg = true;//
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
            <Text style={{ color: font_color }}>{ [todo + " " + doing + " " + review + " " + done + " " + task] }</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  update() {
    db.transaction((tx) => {
      /*tx.executeSql(
        "SELECT * FROM status WHERE doing = ?;",
        [this.props.doing ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );*/
      /*tx.executeSql(
        "SELECT * FROM status WHERE review = ?;",
        [this.props.review ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );*/
      tx.executeSql(
        "SELECT * FROM status WHERE done = ?;",
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
    // Check if the items table exists if not create it
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
      )
    })
    //this.fetchData() // ignore it for now
  }
  
  
  
  
  
  
  /*state = {
    text: null,
  };

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS status (id INTEGER PRIMARY KEY NOT NULL, todo	INTEGER, doing	INTEGER, review	INTEGER, done	INTEGER, task	TEXT);"
      );
    });
  }*/

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

        <ScrollView style={styles.listArea}>
          <Items
            todo={true}
            ref={(todo) => (this.todo = todo)}
            onPressItem={(id) =>
              db.transaction(
                (tx) => {
                  tx.executeSql("UPDATE status SET doing = 1 WHERE id = ?;", [
                    id,
                  ]);
                },
                null,
                this.update
              )
            }
          />
          <Items
            doing={true}
            ref={(doing) => (this.doing = doing)}
            onPressItem={(id) =>
              db.transaction(
                (tx) => {
                  tx.executeSql("UPDATE status SET review = 1 WHERE id = ?;", [
                    id,
                  ]);
                },
                null,
                this.update
              )
            }
          />
          <Items
            review={true}
            ref={(review) => (this.review = review)}
            onPressItem={(id) =>
              db.transaction(
                (tx) => {
                  tx.executeSql("UPDATE status SET done = 1 WHERE id = ?;", [
                    id,
                  ]);
                },
                null,
                this.update
              )
            }
          />
          <Items
            done={true}
            ref={(done) => (this.done = done)}
            onPressItem={(id) =>
              db.transaction(
                (tx) => {
                  tx.executeSql("DELETE FROM status WHERE id = ?;", [id]);
                },
                null,
                this.update
              )
            }
          />
        </ScrollView>
      </View>
    );
  }

  /*fetchData = () => {
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
         success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => this.setState({ data: _array }) 
         failure callback which sends two things Transaction object and Error
        
        //(txObj, error) => console.log('Error ', error)
        
        ) // end executeSQL
    }) // end transaction
  }*/

  add = (text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    /// important
    db.transaction(
      (tx => {
        tx.executeSql("INSERT INTO status (todo, doing, review, done, task) values (1, 0, 0, 0, ?)", [text]);
        /*tx.executeSql("SELECT * FROM status", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );*/
        tx.executeSql('SELECT * FROM status', [], (_, { rows }) => console.log(JSON.stringify(rows)) 
        
        // passing sql query and parameters: null
        // success callback which sends two things Transaction object and ResultSet Object
        
        // failure callback which sends two things Transaction object and Error
        //(txObj, error) => console.log('Error ', error)
        )}),
      null,
      this.update
    );
  }
  /// important
  update = () => {
    this.todo && this.todo.update();
    this.doing && this.doing.update();
    this.review && this.review.update();
    this.done && this.done.update();
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
