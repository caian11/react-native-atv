import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function CalculadoraSomaView() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [resultado, setResultado] = useState(null);
    const [erro, setErro] = useState('');

    function normalizarNumero(txt) {
        return txt.replace(',', '.').trim();
    }

    function validarNumero(txt) {
        const num = parseFloat(normalizarNumero(txt));
        return !Number.isNaN(num);
    }

    function somar() {
        setErro('');
        if (!validarNumero(a) || !validarNumero(b)) {
            setResultado(null);
            setErro('Insira números válidos nos dois campos.');
            return;
        }
        const n1 = parseFloat(normalizarNumero(a));
        const n2 = parseFloat(normalizarNumero(b));
        setResultado(n1 + n2);
    }

    function limpar() {
        setA('');
        setB('');
        setResultado(null);
        setErro('');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding', android: undefined })}
            style={styles.wrapper}
        >
            <View style={styles.card}>
                <Text style={styles.titulo}>Calculadora de Soma</Text>

                <TextInput
                    placeholder="Primeiro número"
                    value={a}
                    onChangeText={setA}
                    keyboardType="decimal-pad"
                    inputMode="decimal"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Segundo número"
                    value={b}
                    onChangeText={setB}
                    keyboardType="decimal-pad"
                    inputMode="decimal"
                    style={styles.input}
                />

                <View style={styles.botoes}>
                    <Button title="Somar" onPress={somar} />
                    <Button title="Limpar" onPress={limpar} />
                </View>

                {erro ? <Text style={styles.erro}>{erro}</Text> : null}

                <Text style={styles.resultadoTitulo}>Resultado:</Text>
                <Text style={styles.resultadoValor}>
                    {resultado === null ? '—' : String(resultado)}
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#0D1B2A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 420,
        backgroundColor: '#1B263B',
        borderRadius: 12,
        padding: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: '600',
        color: '#E0E1DD',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#E0E1DD',
        color: '#0D1B2A',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 4,
        marginBottom: 10,
    },
    erro: {
        color: '#FF8C8C',
        marginBottom: 6,
        textAlign: 'center',
    },
    resultadoTitulo: {
        color: '#A9B4C2',
        marginTop: 10,
        textAlign: 'center',
    },
    resultadoValor: {
        color: '#E0E1DD',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 4,
    },
});
