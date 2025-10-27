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
import { useSelector } from 'react-redux';

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

const HighLight = ({ transaction, categories }) => {
    const totalSpent = transaction
        .filter(item => item.trxType === "2")
        .reduce((sum, item) => sum + item.trxNominal, 0);

    //set top category
    const countCategory = {};

    for (let item of categories) {
        const id = item.categoryId;
        if (countCategory[id]) {
            countCategory[id] += 1; // kalau sudah ada, tambahkan 1
        } else {
            countCategory[id] = 1; // kalau belum ada, mulai dari 1
        }
    }

    console.log(countCategory)
    let mostUsedCategory = null;
    let maxCount = 0;

    for (let id in countCategory) {
        if (countCategory[id] > maxCount) {
            maxCount = countCategory[id];
            mostUsedCategory = id;
        }
    }
    const topSpent = categories.find((el) => el.categoryId === mostUsedCategory).categoryName

    console.log("CategoryID terbanyak:", mostUsedCategory);
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
                        <Text style={{ fontSize: 16 }}>${totalSpent}</Text>

                    </View>
                    <View style={styles.highLightContent}>

                        <Text style={{ paddingBottom: 5, fontWeight: 'bold', fontSize: 16 }}>
                            <Ionicons name="pricetags-outline" size={20} color="black" style={styles.highLightIcon} />
                            Top Spending
                        </Text>
                        <Text style={{ fontSize: 16 }}>{topSpent}</Text>
                    </View>
                </View>
            </View>
        </View>

        // {/* </View> */ }
    )
}

const renderItem = ({ item }) => {
    const isExpense = item.type === 'expense';

    function setCategoryName(item) {
        switch (item) {
            case 0:
                return ''
            default:
                return (categories.find((el) => el.categoryId === item).label)

        }

    }

    return (
        <View style={styles.item}>
            <View style={[styles.iconContainer, { backgroundColor: item.trxType === '2' ? '#FEE2E2' : '#D1FAE5' }]}>
                <Ionicons
                    name={item.category}
                    size={22}
                    color={item.trxType === '2' ? '#DC2626' : '#059669'}
                />
            </View>

            <View style={styles.details}>
                <Text style={styles.title}>{item.trxName}</Text>
                <Text style={styles.categoryName}>{setCategoryName(item.categoryId)}</Text>
                <Text style={styles.date}>{item.trxDate}</Text>
            </View>

            <View style={styles.rightSide}>
                <Pressable>
                    <Text>topSpent</Text>
                    <Ionicons name="eye-outline" size={20} color="black" />

                </Pressable>
                <Text style={[styles.amount, { color: item.trxType === '2' ? '#DC2626' : '#059669' }]}>
                    {item.trxType === '2' ? '-' : '+'}${Number(item.trxNominal).toFixed(2)}
                </Text>
                <Text style={[styles.type, { color: item.trxType === '2' ? '#DC2626' : '#059669' }]}>
                    {item.trxType === '2' ? 'Expense' : 'Income'}
                </Text>

            </View>
        </View>
    );
};

const ListTransaction = ({ transactions, categories, navigation }) => {
    const cat = categories
    function setCategoryName(item) {
        switch (item) {
            case 0:
                return ''
            default:
                return (cat.find((el) => el.categoryId === item).categoryName)
        }
    }

    const [showAction, setShowAction] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const trxAction = (item) => {
        setSelectedRow(item)
        setShowAction(!showAction)
        console.log('selectedRow', selectedRow)
    }

    const editTrx = (selectedRow) => {
        console.log('click edit')
        navigation.navigate('Edit Transaction', selectedRow)

    }

    const deleteTrx = (row) => {

    }
    return (
        <View style={styles.contentContainer}>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.trxId}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={[styles.iconContainer, { backgroundColor: item.trxType === '2' ? '#FEE2E2' : '#D1FAE5' }]}>
                            {/* <Ionicons
                                name={item.category}
                                size={22}
                                color={item.trxType === '2' ? '#DC2626' : '#059669'}
                            /> */}
                        </View>

                        <View style={styles.details}>
                            <Text style={styles.title}>{item.trxName}</Text>
                            <Text style={styles.categoryName}>{setCategoryName(item.categoryId)}</Text>
                            <Text style={styles.date}>{item.trxDate}</Text>
                        </View>

                        <View style={styles.rightSide}>
                            <View style={{ flexDirection: 'row', gap: 4 }}>

                                <View>

                                    <Text style={[styles.amount, { color: item.trxType === '2' ? '#DC2626' : '#059669' }]}>
                                        {item.trxType === '2' ? '-' : '+'}${Number(item.trxNominal).toFixed(2)}
                                    </Text>
                                    <Text style={[styles.type, { color: item.trxType === '2' ? '#DC2626' : '#059669' }]}>
                                        {item.trxType === '2' ? 'Expense' : 'Income'}
                                    </Text>
                                </View>
                                <View>

                                    <Pressable onPress={() => trxAction(item)}>
                                        <Ionicons name="ellipsis-vertical-outline" size={20} color="black" />

                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                transparent
                animationType="fade"
                visible={showAction}
                onRequestClose={() => setShowAction(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setShowAction(false)}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setShowAction(false);
                                editTrx(selectedRow)
                            }}
                        >
                            <Ionicons name="pencil-outline" size={18} color="#3B82F6" />
                            <Text style={styles.menuText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setShowAction(false);
                                // onDelete();
                            }}
                        >
                            <Ionicons name="trash-outline" size={18} color="#EF4444" />
                            <Text style={styles.menuText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
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

    //get data from redux
    const trxList = useSelector((state) => state.transaction.datasTrx)
    const categories = useSelector((state) => state.budgetCategory.datas)

    console.log('trxList', trxList)
    return (


        <SafeAreaView style={styles.container} edges={['top']}>
            {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
            <View style={styles.background}>

                <View style={styles.topSection} />
                <View style={styles.bottomSection} />
            </View>
            <Header />
            <HighLight transaction={trxList} categories={categories} />
            <ListTransaction transactions={trxList} categories={categories} navigation={navigation} />

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
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        width: 160,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        marginLeft: 8,
        fontSize: 16,
    },
});
export default TransactionPage;
