import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

//redux
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { AddCategory, EditCategory, deleteCategory } from '../../store/action/budgetCategoryAction';

const Header = ({ visible, setVisible }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    return (<>
        <View style={styles.header}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 6, }}>Budget Categories</Text>
            <TouchableOpacity onPress={() => setVisible(true)}>

                <Ionicons name="help-circle-outline" size={20} color="white" style={styles.iconInfo} />
            </TouchableOpacity>
            {visible && (
                <Animated.View style={[styles.tooltip, { opacity: fadeAnim }]}>
                    <Text style={styles.tooltipText}>Info tentang kategori anggaran</Text>
                </Animated.View>
            )}


        </View>
    </>
    );
}

function sortByAmount(data) {
    console.log("DATA SORTING: ", data.sort((a, b) => b.categoryAmount - a.categoryAmount));
    return data.sort((a, b) => b.categoryAmount - a.categoryAmount);
}



const handleClickEdit = (item) => {
    const updatedCategory = {
        categoryName: item.categoryName + " (Edited)",
        categoryAmount: item.categoryAmount + 50,
    };
    dispatch(EditCategory(item.categoriId, updatedCategory));
}

const Card = ({ item,
    handleClickEdit,
    handleClickDelete, navigation }) => {
    const { categoryName, categoryAmount } = item;
    return (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{categoryName}</Text>
                <Text style={{ fontWeight: 'bold' }}>{'$' + categoryAmount}</Text>
            </View>
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="pencil-outline" size={20} color="#3B82F6" onPress={() => navigation.navigate('Edit Category', item)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" onPress={() => handleClickDelete(item)} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

// const renderItem = ({ item, navigation }) => (
//     <Pressable>
//         <Card
//             handleClickEdit={handleClickEdit}
//             handleClickDelete={handleClickDelete}
//             item={item}
//             navigation={navigation}
//         />
//     </Pressable>
// );

const ListCategory = ({ listItem, navigation, handleClickDelete }) => {
    // Sort data setiap kali listItem berubah
    const sortedList = useMemo(() => {
        if (!listItem) return [];
        return [...listItem].sort((a, b) => b.categoryAmount - a.categoryAmount);
    }, [listItem]);

    return (
        <>
            <View
                // colors={['white', 'maroon']} // dari putih ke maroon
                // start={{ x: 0, y: 1 }}      // mulai dari atas
                // end={{ x: 0, y: 0 }}        // ke bawah
                style={styles.contentContainer}
            >
                <FlatList
                    data={sortedList}
                    renderItem={({ item }) => (
                        <Pressable>
                            <Card
                                handleClickEdit={handleClickEdit}
                                handleClickDelete={handleClickDelete}
                                item={item}
                                navigation={navigation} // kirim navigation ke Card
                            />
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.categoryId}
                    contentContainerStyle={styles.listContainer}
                    navigation={navigation}

                />

            </View>

        </>
    );
}

const HeadContent = ({ listItem, navigation }) => {
    return (
        <View style={styles.addContainer}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '30 0 30 0' }}>
                <Pressable onPress={() => navigation.navigate('Add Category')}>
                    <View style={{ alignItems: 'center', paddingLeft: 30 }}>
                        <Ionicons name="add" size={35} color="#3B82F6" />
                        <Text>Add Category</Text>
                    </View>

                </Pressable>
                <Pressable>

                    <View style={{ alignItems: 'center', paddingRight: 30 }}>

                        <Ionicons name="funnel-outline" size={35} color="#3B82F6" onPress={() => sortByAmount(listItem)} />
                        <Text>Sort by Amount</Text>

                    </View>
                </Pressable>

            </View>
        </View>
    );
}
const BudgetCategoryPage = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [sortedListItem, setSortedListItem] = useState([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch();
    // AsyncStorage.removeItem('budget-category-data');
    const listItem = useSelector((state) => state.budgetCategory.datas);
    // setSortedListItem(listItem);
    console.log("LIST ITEM: ", listItem);

    // const listItem = [
    //     { categoryId: '1', categoryName: 'Food', categoryAmount: '200' },
    //     { categoryId: '2', categoryName: 'Transport', categoryAmount: '100' },
    //     { categoryId: '3', categoryName: 'Entertainment', categoryAmount: '150' },
    //     { categoryId: '4', categoryName: 'Utilities', categoryAmount: '250' },
    //     { categoryId: '5', categoryName: 'Food', categoryAmount: '200' },
    //     { categoryId: '6', categoryName: 'Transport', categoryAmount: '100' },
    //     { categoryId: '7', categoryName: 'Entertainment', categoryAmount: '150' },
    //     { categoryId: '8', categoryName: 'Utilities', categoryAmount: '250' },

    //     { categoryId: '9', categoryName: 'Food', categoryAmount: '200' },
    //     { categoryId: '10', categoryName: 'Transport', categoryAmount: '100' },
    //     { categoryId: '11', categoryName: 'Entertainment', categoryAmount: '150' },
    //     { categoryId: '12', categoryName: 'Utilities', categoryAmount: '250' },

    // ];

    const handleClickDelete = (item) => {

        Alert.alert("Delete", `Are you sure you want to delete ${item.categoryName}?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => dispatch(deleteCategory(item.categoryId)) }
        ]);
        // dispatch(DeleteCategory(item.categoryId));
    }

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();

            // otomatis hilang setelah 2 detik
            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => setVisible(false));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [visible]);




    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.background}>

                <View style={styles.topSection} />
                <View style={styles.bottomSection} />
            </View>
            {/* <View style={styles.cardsContainer}> */}
            <Header visible={visible} setVisible={setVisible} />
            <HeadContent listItem={listItem} navigation={navigation} />

            {listItem.length !== 0 ? (
                <ListCategory listItem={listItem} navigation={navigation} handleClickDelete={handleClickDelete} />
            ) : (
                <View style={styles.contentContainer}>
                    <View ><Text style={{ textAlign: 'center' }}>No category found.</Text></View>
                </View>
            )}


            {/* </View> */}
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
    cardsContainer: {
        position: 'absolute',
        top: '15%', // geser sedikit dari atas supaya card "menumpuk" maroon & putih
        width: '100%',
        paddingHorizontal: 16,
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
    addContainer: {
        paddingHorizontal: 20,
        paddingVertical: 40,
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
        marginTop: 10,

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

    listContainer: {
        // paddingHorizontal: 16,
        // paddingBottom: 100,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: 'maroon',
        marginBottom: 12,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 6,
    },
    tooltip: {
        position: 'absolute',
        top: -40, // posisikan di atas icon
        left: -60,
        backgroundColor: 'rgba(0,0,0,0.85)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    tooltipText: {
        color: 'white',
        fontSize: 12,
    },


});
export default BudgetCategoryPage;
