import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function EspelhoDeTexto({ placeholder, label = 'Você digitou:' }) {
    const [texto, setTexto] = useState('');

    const limpar = () => {
        setTexto('');
    };

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={texto}
                onChangeText={setTexto}
            />
            <Button title="Limpar" onPress={limpar} />
            <Text>
                {texto ? `${label} ${texto}` : 'Nada digitado ainda.'}
            </Text>
        </View>
    );
}
