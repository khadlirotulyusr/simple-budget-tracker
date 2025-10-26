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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    return (<>
        <View style={styles.header}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 6, }}>Transaction History</Text>
            <TouchableOpacity>

                <Ionicons name="help-circle-outline" size={20} color="white" style={styles.iconInfo} />
            </TouchableOpacity>



        </View>
    </>
    );
}

const HighLight = () => {
    return (
        // <View style={styles.highLightContainer}>
        <View
            // colors={['white', 'maroon']} // dari putih ke maroon
            // start={{ x: 0, y: 1 }}      // mulai dari atas
            // end={{ x: 0, y: 0 }}        // ke bawah
            style={styles.highLightContainer}
        >

            <View style={{ flexDirection: 'column' }}>

                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Highlights</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={styles.highLightContent}>
                        <Text style={{ paddingBottom: 5, fontWeight: 'bold', fontSize: 16 }}>
                            <Ionicons name="card-outline" size={20} color="black" style={styles.highLightIcon} />
                            Total Spent
                        </Text>
                        <Text style={{ fontSize: 16 }}>$1200.00</Text>

                    </View>
                    <View style={styles.highLightContent}>

                        <Text style={{ paddingBottom: 5, fontWeight: 'bold', fontSize: 16 }}>
                            <Ionicons name="pricetags-outline" size={20} color="black" style={styles.highLightIcon} />
                            Top Spending
                        </Text>
                        <Text style={{ fontSize: 16 }}>Groceries</Text>
                    </View>
                </View>
            </View>
        </View>

        // {/* </View> */ }
    )
}

const renderItem = ({ item }) => {
    const isExpense = item.type === 'expense';

    return (
        <View style={styles.item}>
            <View style={[styles.iconContainer, { backgroundColor: isExpense ? '#FEE2E2' : '#D1FAE5' }]}>
                <Ionicons
                    name={item.category}
                    size={22}
                    color={isExpense ? '#DC2626' : '#059669'}
                />
            </View>

            <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.categoryName}>{item.categoryName}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.rightSide}>
                <Text style={[styles.amount, { color: isExpense ? '#DC2626' : '#059669' }]}>
                    {isExpense ? '-' : '+'}${item.amount.toFixed(2)}
                </Text>
                <Text style={[styles.type, { color: isExpense ? '#DC2626' : '#059669' }]}>
                    {isExpense ? 'Expense' : 'Income'}
                </Text>
            </View>
        </View>
    );
};

const ListTransaction = ({ transactions }) => {
    return (
        <View style={styles.contentContainer}>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const TransactionPage = ({ navigation }) => {
    const transactions = [
        { id: '1', title: 'Groceries', date: '2025-10-25', amount: -50.25, categoryId: 1, categoryName: 'A', type: 'expense' },
        { id: '2', title: 'Salary', date: '2025-10-24', amount: 1200.0, categoryId: 2, categoryName: 'A', type: 'income' },
        { id: '3', title: 'Electric Bill', date: '2025-10-23', amount: -75.5, categoryId: 3, categoryName: 'B', type: 'expense' },
        { id: '4', title: 'Transport', date: '2025-10-22', amount: -20.0, categoryId: 4, categoryName: 'A', type: 'expense' },
        { id: '5', title: 'Dinner', date: '2025-10-21', amount: -35.9, categoryId: 5, categoryName: 'C', type: 'expense' },
    ];
    return (


        <SafeAreaView style={styles.container} edges={['top']}>
            {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
            <View style={styles.background}>

                <View style={styles.topSection} />
                <View style={styles.bottomSection} />
            </View>
            <Header />
            <HighLight />
            <ListTransaction transactions={transactions} />

            {/* </ScrollView> */}


        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cbd0d4ff',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    topSection: {
        flex: 0.25, // 20%
        backgroundColor: 'maroon',
    },
    bottomSection: {
        flex: 0.75, // 80%
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        marginBottom: 30,
    },
    iconInfo: {
        marginTop: 2,
    },
    highLightContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 15,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 16,
        padding: 20,
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderColor: 'white',
    },
    highLightContent: {
        alignItems: 'center',
        padding: 30,
    },
    highLightIcon: {
        // marginBottom: 10,
        marginRight: 10,
        marginTop: 2,
    },
    contentContainer: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 25,
        margin: 10,
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'white',
        width: '95%'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
    },
    iconContainer: {
        borderRadius: 10,
        padding: 8,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
        color: '#111827',
    },
    categoryName: {
        fontSize: 10,
        color: '#6B7280',
    },
    date: {
        fontSize: 12,
        color: '#6B7280',
    },
    rightSide: {
        alignItems: 'flex-end',
    },
    amount: {
        fontWeight: '700',
        fontSize: 16,
    },
    type: {
        fontSize: 12,
        fontWeight: '500',
    },
});
export default TransactionPage;
