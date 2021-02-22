import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput } from 'react-native';

import Todo from './Todo';

const TodoList = () => {

    const [title, setTitle] = useState('TodoList')

    return(
        <View style= {{width: '80%', marginBottom: 60 }}>
            <Text style={[styles.align, styles.font]}>{title}</Text>
            <ScrollView>
                <Todo name={'First Todo'} />
                <Todo name={'Second Todo'} />
            </ScrollView>
            <View>
                <TextInput style={styles.input} />
                <Button title='Chang me' onPress={() => setTitle('My List')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    align: {
        alignSelf: 'center'
    },
    font: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 8,
        padding: 8
    }
})

export default TodoList;