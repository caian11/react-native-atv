import React from 'react';
import { View } from 'react-native';
import EspelhoDeTexto from "./components/EspelhoTexto";

export default function EspelhoDeTextoView() {
    return (
        <View>
            <EspelhoDeTexto placeholder="Digite algo..." />
        </View>
    );
}
