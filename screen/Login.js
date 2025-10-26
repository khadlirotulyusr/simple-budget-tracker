import React, { useState, useEffect, useRef } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    Dimensions,
    FlatList,
    Platform,
    StatusBar,
    Modal,
    Image,
    TouchableOpacity,
    Animated
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginPage = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.outerBox}>
            <View style={styles.container}>
                <Text style={styles.headerText}>All your contacts in one place</Text>
            </View>
            <Pressable onPress={() => navigation.navigate("Contact")}>
                <Text style={styles.button}>Get Started!</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        backgroundColor: "#f6c5b9",
    },
    outerBox: {
        flex: 1,
        backgroundColor: "#294941",
        alignItems: "center",
        justifyContent: "center",
    },

    headerText: {
        padding: 40,
        fontSize: 20,
    },
    button: {
        fontSize: 20,
        marginVertical: 10,
        padding: 20,
        borderRadius: 30,
        backgroundColor: "yellow",
        color: "black",
        fontWeight: "bold",
    },
});
export default LoginPage;
