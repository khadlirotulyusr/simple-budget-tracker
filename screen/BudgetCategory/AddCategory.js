import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
//redux
import { useSelector, useDispatch } from "react-redux";
import { addCategory, editCategory, deleteCategory } from '../../store/action/budgetCategoryAction';


const AddBudgetCategoryPage = ({ navigation }) => {
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryAmount, setCategoryAmount] = useState('');

    //redux
    const dispatch = useDispatch();


    const handleAddCategory = () => {
        if (!categoryName || !categoryAmount) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }
        const newCategory = {
            categoryId: Date.now().toString(),
            categoryName: categoryName,
            categoryAmount: parseFloat(categoryAmount),
        };

        console.log('Kategori baru:', newCategory);
        dispatch(addCategory(newCategory));
        Alert.alert('Success', 'New category successfully added!');
        navigation.goBack(); // kembali ke screen sebelumnya
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.background}>

                <View style={styles.topSection} />
                <View style={styles.bottomSection} />
            </View>
            <Text style={styles.title}>Add Budget Category</Text>
            <View style={styles.addContainer}>

                <View style={styles.inputGroup}>
                    {/* <View style={styles.inputGroup}>
                        <Text style={styles.label}>Category ID</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Category ID"
                            value={categoryId}
                            onChangeText={setCategoryId}
                        />
                    </View> */}
                    <Text style={styles.label}>Category Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Category Name"
                        value={categoryName}
                        onChangeText={setCategoryName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="$"
                        keyboardType="numeric"
                        value={categoryAmount}
                        onChangeText={setCategoryAmount}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
                    <Text style={styles.buttonText}>Add Category</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

export default AddBudgetCategoryPage;

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
});
