import React, { useEffect, useState } from 'react';
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
    Animated,
    TextInput
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
//redux
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from '../../store/action/transactionAction';


const EditTransactionPage = ({ navigation, route }) => {
    console.log("row data:", route.params);
    const row = route.params;

    const [trxId, setTrxId] = useState(row.trxId || 0);
    const [trxName, setTrxName] = useState(row.trxName || '');
    const [selectedTrxType, setSelectedTrxType] = useState(row.trxType);
    const [categoryId, setCategoryId] = useState('');
    const [optCategory, setOptCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(() => {
        return optCategory.find(el => el.value === row.categoryId) || null
    });
    const [trxNominal, setTrxNominal] = useState(row.trxNominal.toString());
    // const [trxDate, setTrxDate] = useState(trxDate);
    const [trxDate, setTrxDate] = useState(() => {
        const [day, month, year] = row.trxDate.split("/").map(Number);
        return new Date(year, month - 1, day);
    });
    const [showPicker, setShowPicker] = useState(false);
    const optTrxType = [
        { value: '1', label: 'Income' },
        { value: '2', label: 'Expense' },
    ]

    console.log(selectedCategory, 'selectedCategory')

    //redux
    const dispatch = useDispatch();

    //get data budget category from redux
    const budgetCategories = useSelector((state) => state.budgetCategory.datas);
    useEffect(() => {
        const categories = budgetCategories.map(cat => ({
            label: cat.categoryName,
            value: cat.categoryId,
        }));
        setOptCategory(categories);
    }, []); // Jalankan sekali saat komponen dimount

    const handleChangeDate = (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setTrxDate(selectedDate);
        }
    };

    const formattedDate = trxDate.toLocaleDateString('en-GB'); // dd/mm/yyyy


    const handleAddTransaction = () => {
        if (selectedTrxType === '1') {
            if (!selectedTrxType || !trxName || !trxNominal) {
                Alert.alert('Error', 'All fields are required!');
                return;
            }
        } else {

            if (!selectedTrxType || !trxName || !trxNominal || !selectedCategory) {
                Alert.alert('Error', 'All fields are required!');
                return;
            }
        }
        const newTrx = {
            trxDate: formattedDate,
            trxId: Date.now().toString(),
            trxName: trxName,
            trxType: selectedTrxType || 0,
            trxNominal: parseFloat(trxNominal),
            categoryId: selectedCategory?.value || 0,
        };

        console.log('Transaksi edit:', newTrx);
        dispatch(addTransaction(newTrx));
        Alert.alert('Success', 'New transaction successfully edited!');
        navigation.goBack(); // kembali ke screen sebelumnya
        // navigation.navigate('History')
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.background}>

                <View style={styles.topSection} />
                <View style={styles.bottomSection} />
            </View>
            <Text style={styles.title}>Edit Transaction</Text>
            <View style={styles.addContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Transaction Date</Text>
                    <TouchableOpacity
                        style={styles.inputDate}
                        onPress={() => setShowPicker(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.dateText}>{formattedDate}</Text>
                        <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={trxDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={handleChangeDate}
                            maximumDate={new Date()}
                        />
                    )}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Transaction Type</Text>

                    <View style={styles.radioContainer}>
                        {optTrxType.map((opt) => (
                            <TouchableOpacity
                                key={opt.value}
                                style={styles.radioOption}
                                onPress={() => {
                                    setSelectedCategory(null);
                                    setSelectedTrxType(opt.value)
                                }}>
                                <View style={styles.radioCircle}>
                                    {selectedTrxType === opt.value && (
                                        <View style={styles.radioSelected} />
                                    )}
                                </View>
                                <Text style={styles.radioLabel}>{opt.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {selectedTrxType === '2'
                    ? (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Category</Text>
                            <SelectDropdown
                                data={optCategory}
                                defaultValue={selectedCategory}
                                onSelect={(selectedItem, index) => {
                                    setSelectedCategory(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButton}>
                                            <Text style={styles.dropdownButtonTxt}>
                                                {(selectedItem && selectedItem.label) || 'Select category'}
                                            </Text>
                                            <Ionicons
                                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                                size={18}
                                                color="#6B7280"
                                            />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View
                                            style={[
                                                styles.dropdownItem,
                                                isSelected && { backgroundColor: '#E5E7EB' },
                                            ]}>
                                            <Text style={styles.dropdownItemTxt}>{item.label}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenu}
                            />
                        </View>
                    ) : <></>}



                <View style={styles.inputGroup}>

                    <Text style={styles.label}>Transaction Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Transaction Name"
                        value={trxName}
                        onChangeText={setTrxName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nominal</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="$"
                        keyboardType="numeric"
                        value={trxNominal}
                        onChangeText={setTrxNominal}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleAddTransaction}>
                    <Text style={styles.buttonText}>Add Transaction</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

export default EditTransactionPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
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
    addContainer: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 25,
        margin: 10,
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'white',
        width: '95%'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#ffff',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        backgroundColor: '#F9FAFB',
    },
    button: {
        backgroundColor: '#3B82F6',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#F9FAFB',
    },
    dropdownButtonTxt: {
        fontSize: 14,
        color: '#111827',
    },

    // 🔽 isi dropdown menu
    dropdownMenu: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 5,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    dropdownItemTxt: {
        fontSize: 14,
        color: '#111827',
    },

    //radio button
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3B82F6',
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: '#111827',
    },


    //date
    inputDate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#F9FAFB',
    },
    dateText: {
        fontSize: 14,
        color: '#111827',
    },
});
