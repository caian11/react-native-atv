import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Contador() {
    const [valor, setValor] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Valor atual: {valor}</Text>

            <TouchableOpacity
                style={styles.botao}
                onPress={() => setValor(valor + 1)}
            >
                <Text style={styles.botaoTexto}>Incrementar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 20,
    },
    texto: {
        fontSize: 22,
        color: "#E0E1DD",
        marginBottom: 15,
        fontWeight: "bold",
    },
    botao: {
        backgroundColor: "#1B263B",
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    botaoTexto: {
        color: "#E0E1DD",
        fontSize: 16,
        fontWeight: "600",
    },
});
