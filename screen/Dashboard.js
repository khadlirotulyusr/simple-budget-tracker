import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
// import { ProgressChart } from 'react-native-chart-kit'; // Untuk Progress Bar Anggaran

//redux
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
// import { AddCategory, EditCategory, DeleteCategory } from '../../store/action/budgetCategoryAction';
import { store } from "../store/index";

// --- DATA SIMULASI (Ganti dengan data Redux Anda) ---
const totalBalance = 12500000;
const monthlyExpense = 4800000;

// const budgetData = [
//     { name: 'Makanan', current: 1800000, limit: 2500000, color: '#FF7043' },
//     { name: 'Transportasi', current: 550000, limit: 750000, color: '#4CAF50' },
//     { name: 'Hiburan', current: 900000, limit: 1000000, color: '#29B6F6' },
// ];

// Data untuk ProgressChart (harus dalam format 0.0 sampai 1.0)
// const chartData = {
//     labels: budgetData.map(b => b.name),
//     data: budgetData.map(b => b.current / b.limit),
// };

const clearAll = async () => {
    try {
        await AsyncStorage.clear();
        console.log("✅ Semua data AsyncStorage sudah dihapus");
    } catch (e) {
        console.error("Gagal menghapus AsyncStorage:", e);
    }
};

const Avatar = ({ initials, size, backgroundColor }) => (
    <View >
        <Pressable >
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingLeft: '0' }}>
                <Image
                    source={require('../assets/avatar.png')}
                    style={styles.avatar} />
                <View style={{ padding: 10 }}>
                    <Text style={{ color: 'white' }}>Welcome Back!</Text>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>David</Text>
                </View>

            </View>
        </Pressable>
    </View>
)

const BalanceCard = ({ title, amount, iconName, color, dataTrx }) => (
    <View style={[styles.balanceCard, { backgroundColor: color + '10', borderColor: color }]}>
        <Ionicons name={iconName} size={28} color={color} />
        <View>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={[styles.cardAmount, { color: color }]}>
                {amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </Text>
        </View>
    </View>
);

const BudgetProgress = ({ name, categoryId, current, limit, color, amount, transaction }) => {

    const remaining = limit - current;
    const progressColor = percentage > 90 ? '#E53935' : color; // Merah jika hampir habis
    const amountBudget = Number(amount);


    //calculate total expenses by category
    function calculate(categoryId) {
        const totalSpendByCat = transaction
            .filter(item => item.categoryId === categoryId)
            .reduce((sum, item) => sum + item.trxNominal, 0);

        return totalSpendByCat

    }

    const percentage = Math.round((12 / amountBudget) * 100);
    console.log(percentage)


    return (
        <View style={styles.budgetItem}>
            <View style={styles.budgetHeader}>
                <Text style={styles.budgetName}>{name}</Text>
                <Text style={styles.budgetAmount}>
                    {calculate(categoryId).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })} / {amountBudget.toLocaleString('en-US')}
                </Text>
            </View>
            <View style={styles.progressBarBackground}>
                <View
                    style={[
                        styles.progressBarFill,
                        {
                            width: `${Math.min(Math.round((calculate(categoryId) / amountBudget) * 100), 100)}%`, // Batasi di 100% untuk UI
                            backgroundColor: progressColor,
                        },
                    ]}
                />
            </View>
            <Text style={styles.budgetRemaining}>
                {remaining >= 0
                    ? `Sisa ${totalBalance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}`
                    : `Melebihi ${totalBalance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}`}
            </Text>
        </View>
    );
};

// --- LAYAR UTAMA ---

const DashboardScreen = ({ navigation }) => {

    const [dataTrx, setDataTrx] = useState([])

    const navigateToAddTransaction = () => {
        // Navigasi ke layar Tambah Transaksi
        navigation.navigate('Add Transaction');
        console.log('Navigate to Add Transaction Screen');
    };
    const dispatch = useDispatch();
    // console.log(store.getState());
    // clearAll()
    // AsyncStorage.removeItem('budget-category-data');
    // AsyncStorage.setItem('budget-category-data', JSON.stringify([]));


    const budgetData = useSelector((state) => state.budgetCategory.datas);
    const transactionData = useSelector((state) => state.transaction.datasTrx);
    // setDataTrx(transactionData)
    // console.log("budgetData: ", budgetData);

    //calculate total expenses
    const totalSpent = transactionData
        .filter(item => item.trxType === "2")
        .reduce((sum, item) => sum + item.trxNominal, 0);
    //calculate total income
    const totalIncome = transactionData
        .filter(item => item.trxType === "1")
        .reduce((sum, item) => sum + item.trxNominal, 0);

    const totalBalances = totalIncome - totalSpent




    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.background}>

                    <View style={styles.topSection} />
                    <View style={styles.bottomSection} />
                </View>
                <View style={styles.header}>
                    <Avatar initials="YU" size={40} backgroundColor="#007AFF" />
                    <Ionicons name="notifications-outline" size={24} color="#ffffffff" />
                </View>

                {/* Balance */}
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Your Balance</Text>
                    <Text style={styles.totalBalanceText}>
                        {totalBalances.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </Text>
                </View>

                {/* Summary */}
                <View style={styles.summaryCards}>
                    <BalanceCard
                        title="Expense this month"
                        amount={totalSpent}
                        iconName="trending-down-outline"
                        color="#E53935"
                    />
                    <BalanceCard
                        title="Income this month"
                        amount={totalIncome}
                        iconName="trending-up-outline"
                        color="#4CAF50"
                    />
                </View>

                {/* <Text style={styles.sectionTitle}>Status Anggaran Anda</Text> */}
                {/* <View style={styles.chartContainer}> */}
                {/* <ProgressChart
                        data={chartData}
                        width={350} // Lebar Chart
                        height={200}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.5})`, // Warna label
                            labelColor: (opacity = 1) => `rgba(17, 24, 39, ${opacity})`,
                            propsForLabels: {
                                fontSize: 12,
                            }
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    /> */}
                {/* </View> */}

                <View style={styles.budgetList}>
                    {budgetData.map((b, index) => (
                        <BudgetProgress key={index} {...b} name={b.categoryName} categoryId={b.categoryId} amount={b.categoryAmount} transaction={transactionData} />
                    ))}
                </View>
                {/* Add Transaction */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={navigateToAddTransaction}
                >
                    <Ionicons name="add" size={30} color="#FFFFFF" />
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        // backgroundColor: '#cbd0d4ff',
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
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    greeting: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
    },
    balanceContainer: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        borderRadius: 16,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
    },
    balanceLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
        textAlign: 'center',
    },
    totalBalanceText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1F2937',
        textAlign: 'center',
    },
    summaryCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 15,
    },
    balanceCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 5,
        borderRadius: 12,
        borderLeftWidth: 4,
        gap: 10,
    },
    cardTitle: {
        fontSize: 12,
        color: '#6B7280',
    },
    cardAmount: {
        fontSize: 16,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginTop: 25,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    chartContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        borderRadius: 16,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 3,
    },
    budgetList: {
        paddingHorizontal: 15,
        marginTop: 10,
        gap: 10,
    },
    budgetItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    budgetName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
    },
    budgetAmount: {
        fontSize: 14,
        color: '#4B5563',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 5,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    budgetRemaining: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 0,
        // backgroundColor: '#007AFF', // Warna Biru Khas iOS/Material
        backgroundColor: 'maroon',

        borderRadius: 30,
        elevation: 8, // Efek bayangan Android
        shadowColor: '#000', // Efek bayangan iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
});

export default DashboardScreen;