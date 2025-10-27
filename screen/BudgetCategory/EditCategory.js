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
import { editCategory } from '../../store/action/budgetCategoryAction';
import { useSelector, useDispatch } from "react-redux";



const EditBudgetCategoryPage = ({ route, navigation }) => {
    // const { data } = route.params; // ambil data yang dikirim
    console.log("row data:", route.params);
    const row = route.params;

    //redux
    const dispatch = useDispatch();

    const [categoryId, setCategoryId] = useState(row.categoryId || '');
    const [categoryName, setCategoryName] = useState(row.categoryName || '');
    const [categoryAmount, setCategoryAmount] = useState(row.categoryAmount ? row.categoryAmount.toString() : '');

    const handleEditCategory = () => {
        if (!categoryName || !categoryAmount) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

        const updatedCategory = {
            categoryId: categoryId,
            categoryName: categoryName,
            categoryAmount: parseFloat(categoryAmount),
        };

        console.log('Kategori update:', updatedCategory);
        dispatch(editCategory(updatedCategory));
        Alert.alert('Success', 'Data successfully edited!');
        navigation.goBack(); // kembali ke screen sebelumnya
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.background}>

                <View style={styles.topSection} />
                <View style={styles.bottomSection} />
            </View>
            <Text style={styles.title}>Edit Budget Category</Text>
            <View style={styles.addContainer}>

                <View style={styles.inputGroup}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Category ID</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder="Enter Category ID"
                            value={categoryId}
                            onChangeText={setCategoryId}
                        />
                    </View>
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

                <TouchableOpacity style={styles.button} onPress={handleEditCategory}>
                    <Text style={styles.buttonText}>Edit Category</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

export default EditBudgetCategoryPage;

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
