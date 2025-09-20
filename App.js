import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EspelhoDeTextoView from "./EspelhoTextoView";
import CalculadoraSomaView from "./Calculadora";
import FormCadastro from "./Pessoa";

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🚀 Bem-vindo ao App de Teste!</Text>
            <Text style={styles.subtitle}>Open up App.js e comece a brincar!</Text>

            <View style={{ width: '100%', gap: 12 }}>
                <Button
                    title="Abrir Espelho de Texto"
                    onPress={() => navigation.navigate('EspelhoTexto')}
                />
                <Button
                    title="Abrir Calculadora de Soma"
                    onPress={() => navigation.navigate('Calculadora')}
                />
                <Button
                    title="Abrir Form de Pessoa"
                    onPress={() => navigation.navigate('Pessoa')}
                />
            </View>

            <StatusBar style="light" />
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="EspelhoTexto" component={EspelhoDeTextoView} />
                <Stack.Screen name="Calculadora" component={CalculadoraSomaView} />
                <Stack.Screen name="Pessoa" component={FormCadastro} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1B2A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 16,
    },
    containerCenter: {
        flex: 1,
        backgroundColor: '#0D1B2A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#E0E1DD',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#778DA9',
        marginBottom: 30,
        textAlign: 'center',
    },
});
