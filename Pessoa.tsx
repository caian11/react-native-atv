import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
const onlyDigits = (s: string) => s.replace(/\D+/g, '');

const maskDate = (s: string) => {
    const d = onlyDigits(s).slice(0, 8);
    const p1 = d.slice(0, 2);
    const p2 = d.slice(2, 4);
    const p3 = d.slice(4, 8);
    let out = p1;
    if (p2) out += '/' + p2;
    if (p3) out += '/' + p3;
    return out;
};

const maskCPF = (s: string) => {
    const d = onlyDigits(s).slice(0, 11);
    const p1 = d.slice(0, 3);
    const p2 = d.slice(3, 6);
    const p3 = d.slice(6, 9);
    const p4 = d.slice(9, 11);
    let out = p1;
    if (p2) out += '.' + p2;
    if (p3) out += '.' + p3;
    if (p4) out += '-' + p4;
    return out;
};

const maskCEP = (s: string) => {
    const d = onlyDigits(s).slice(0, 8);
    const p1 = d.slice(0, 5);
    const p2 = d.slice(5, 8);
    return p2 ? `${p1}-${p2}` : p1;
};

const maskPhone10 = (s: string) => {
    const d = onlyDigits(s).slice(0, 10);
    const ddd = d.slice(0, 2);
    const p1 = d.slice(2, 6);
    const p2 = d.slice(6, 10);
    let out = ddd ? `(${ddd})` : '';
    if (p1) out += ` ${p1}`;
    if (p2) out += `-${p2}`;
    return out.trim();
};

const maskPhone11 = (s: string) => {
    const d = onlyDigits(s).slice(0, 11);
    const ddd = d.slice(0, 2);
    const p1 = d.slice(2, 7);
    const p2 = d.slice(7, 11);
    let out = ddd ? `(${ddd})` : '';
    if (p1) out += ` ${p1}`;
    if (p2) out += `-${p2}`;
    return out.trim();
};

const isValidDate = (ddmmyyyy: string) => {
    const m = ddmmyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return false;
    const dd = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10) - 1; // 0-11
    const yyyy = parseInt(m[3], 10);
    const dt = new Date(yyyy, mm, dd);
    if (
        dt.getFullYear() !== yyyy ||
        dt.getMonth() !== mm ||
        dt.getDate() !== dd
    ) return false;
    const now = new Date();
    if (dt > now) return false;
    if (now.getFullYear() - yyyy > 130) return false;
    return true;
};

const getAge = (ddmmyyyy: string): number | null => {
    if (!isValidDate(ddmmyyyy)) return null;
    const [d, m, y] = ddmmyyyy.split('/').map(Number);
    const today = new Date();
    let age = today.getFullYear() - y;
    const monthDiff = today.getMonth() + 1 - m;
    const dayDiff = today.getDate() - d;
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
    return age;
};

const isValidCPF = (cpfInput: string) => {
    const cpf = onlyDigits(cpfInput);
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // sequências iguais
    const calcDig = (base: string) => {
        let sum = 0;
        for (let i = 0; i < base.length; i++) sum += parseInt(base[i]) * (base.length + 1 - i);
        const mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
    };
    const d1 = calcDig(cpf.slice(0, 9));
    const d2 = calcDig(cpf.slice(0, 9) + d1);
    return cpf === cpf.slice(0, 9) + d1.toString() + d2.toString();
};

const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

const isStrongPassword = (pwd: string) => {
    if (pwd.length < 8) return false;
    const up = /[A-Z]/.test(pwd);
    const low = /[a-z]/.test(pwd);
    const num = /\d/.test(pwd);
    const sp = /[^A-Za-z0-9]/.test(pwd);
    return up && low && num && sp;
};

const isValidLandline = (s: string) => {
    const d = onlyDigits(s);
    return d.length === 10;
};

const isValidCell = (s: string) => {
    const d = onlyDigits(s);
    if (d.length !== 11) return false;
    return d[2] === '9';
};

const isValidCEP = (s: string) => {
    const d = onlyDigits(s);
    return d.length === 8;
};

const hasTwoNames = (full: string) => {
    const parts = full.trim().split(/\s+/).filter(Boolean);
    return parts.length >= 2;
};

export default function FormCadastro() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [telFixo, setTelFixo] = useState('');
    const [celular, setCelular] = useState('');
    const [nomePai, setNomePai] = useState('');
    const [nomeMae, setNomeMae] = useState('');

    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const idade = useMemo(() => getAge(dataNasc), [dataNasc]);
    const menorIdade = idade !== null && idade < 18;

    const errors = {
        nomeCompleto: nomeCompleto.trim() === '' || !hasTwoNames(nomeCompleto)
            ? 'Informe nome e sobrenome.'
            : '',
        dataNasc: dataNasc && !isValidDate(dataNasc) ? 'Data inválida (DD/MM/AAAA).' : (dataNasc ? '' : 'Obrigatório.'),
        cpf: cpf && !isValidCPF(cpf) ? 'CPF inválido.' : (cpf ? '' : 'Obrigatório.'),
        telFixo: telFixo && !isValidLandline(telFixo) ? 'Telefone fixo deve ter 10 dígitos com DDD.' : '',
        celular: celular ? (!isValidCell(celular) ? 'Celular deve ter 11 dígitos com 9º dígito.' : '') : 'Obrigatório.',
        nomePai: menorIdade ? (nomePai.trim() ? '' : 'Obrigatório para menores.') : '',
        nomeMae: menorIdade ? (nomeMae.trim() ? '' : 'Obrigatório para menores.') : '',
        cep: cep && !isValidCEP(cep) ? 'CEP inválido.' : (cep ? '' : 'Obrigatório.'),
        endereco: endereco.trim() ? '' : 'Obrigatório.',
        numero: numero.trim() ? '' : 'Obrigatório.',
        cidade: cidade.trim() ? '' : 'Obrigatório.',
        estado: estado.trim() ? '' : 'Obrigatório.',
        email: email && !isValidEmail(email) ? 'E-mail inválido.' : (email ? '' : 'Obrigatório.'),
        senha: senha ? (isStrongPassword(senha) ? '' : 'Mín. 8, com maiúscula, minúscula, número e especial.') : 'Obrigatório.',
        confirmarSenha: confirmarSenha ? (confirmarSenha === senha ? '' : 'Senhas não conferem.') : 'Obrigatório.',
    } as const;

    const allValid = Object.values(errors).every((e) => e === '');

    const onChangeData = (v: string) => setDataNasc(maskDate(v));
    const onChangeCPF = (v: string) => setCpf(maskCPF(v));
    const onChangeCEP = (v: string) => setCep(maskCEP(v));
    const onChangeTel = (v: string) => setTelFixo(maskPhone10(v));
    const onChangeCel = (v: string) => setCelular(maskPhone11(v));

    const handleSubmit = () => {
        if (!allValid) return;
        const payload = {
            nomeCompleto: nomeCompleto.trim(),
            dataNasc,
            idade,
            cpf: onlyDigits(cpf),
            telFixo: onlyDigits(telFixo),
            celular: onlyDigits(celular),
            nomePai: nomePai.trim() || null,
            nomeMae: nomeMae.trim() || null,
            cep: onlyDigits(cep),
            endereco: endereco.trim(),
            numero: numero.trim(),
            complemento: complemento.trim() || null,
            cidade: cidade.trim(),
            estado: estado.trim(),
            email: email.trim(),
            senha,
        };
        console.log('SUBMIT', payload);
    };

    const renderError = (msg?: string) => !!msg && (
        <Text style={styles.errorText}>{msg}</Text>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>

            <View style={styles.field}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    style={[styles.input, errors.nomeCompleto ? styles.inputError : null]}
                    value={nomeCompleto}
                    onChangeText={setNomeCompleto}
                    placeholder="Nome e sobrenome"
                    autoCapitalize="words"
                    returnKeyType="next"
                />
                {renderError(errors.nomeCompleto)}
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput
                    style={[styles.input, errors.dataNasc ? styles.inputError : null]}
                    value={dataNasc}
                    onChangeText={onChangeData}
                    placeholder="DD/MM/AAAA"
                    keyboardType="number-pad"
                    returnKeyType="next"
                    maxLength={10}
                />
                {idade !== null && (
                    <Text style={styles.hint}>Idade calculada: {idade} anos</Text>
                )}
                {renderError(errors.dataNasc)}
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>CPF</Text>
                <TextInput
                    style={[styles.input, errors.cpf ? styles.inputError : null]}
                    value={cpf}
                    onChangeText={onChangeCPF}
                    placeholder="000.000.000-00"
                    keyboardType="number-pad"
                    maxLength={14}
                    returnKeyType="next"
                />
                {renderError(errors.cpf)}
            </View>

            <View style={styles.fieldRow}>
                <View style={[styles.field, styles.flex1]}>
                    <Text style={styles.label}>Telefone Fixo (com DDD)</Text>
                    <TextInput
                        style={[styles.input, errors.telFixo ? styles.inputError : null]}
                        value={telFixo}
                        onChangeText={onChangeTel}
                        placeholder="(11) 2345-6789"
                        keyboardType="number-pad"
                        maxLength={15}
                        returnKeyType="next"
                    />
                    {renderError(errors.telFixo)}
                </View>
                <View style={[styles.field, styles.flex1]}>
                    <Text style={styles.label}>Celular (com DDD)</Text>
                    <TextInput
                        style={[styles.input, errors.celular ? styles.inputError : null]}
                        value={celular}
                        onChangeText={onChangeCel}
                        placeholder="(11) 91234-5678"
                        keyboardType="number-pad"
                        maxLength={16}
                        returnKeyType="next"
                    />
                    {renderError(errors.celular)}
                </View>
            </View>

            {menorIdade && (
                <View style={styles.complementarBox}>
                    <Text style={styles.subSectionTitle}>Informações Complementares (menor de idade)</Text>
                    <View style={styles.field}>
                        <Text style={styles.label}>Nome do Pai</Text>
                        <TextInput
                            style={[styles.input, errors.nomePai ? styles.inputError : null]}
                            value={nomePai}
                            onChangeText={setNomePai}
                            placeholder="Nome completo do pai"
                            autoCapitalize="words"
                        />
                        {renderError(errors.nomePai)}
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Nome da Mãe</Text>
                        <TextInput
                            style={[styles.input, errors.nomeMae ? styles.inputError : null]}
                            value={nomeMae}
                            onChangeText={setNomeMae}
                            placeholder="Nome completo da mãe"
                            autoCapitalize="words"
                        />
                        {renderError(errors.nomeMae)}
                    </View>
                </View>
            )}

            <Text style={styles.sectionTitle}>Endereço</Text>

            <View style={styles.fieldRow}>
                <View style={[styles.field, styles.flex1]}>
                    <Text style={styles.label}>CEP</Text>
                    <TextInput
                        style={[styles.input, errors.cep ? styles.inputError : null]}
                        value={cep}
                        onChangeText={onChangeCEP}
                        placeholder="00000-000"
                        keyboardType="number-pad"
                        maxLength={9}
                    />
                    {renderError(errors.cep)}
                </View>
                <View style={[styles.field, styles.flex2]}>
                    <Text style={styles.label}>Endereço</Text>
                    <TextInput
                        style={[styles.input, errors.endereco ? styles.inputError : null]}
                        value={endereco}
                        onChangeText={setEndereco}
                        placeholder="Rua, Av., etc."
                    />
                    {renderError(errors.endereco)}
                </View>
            </View>

            <View style={styles.fieldRow}>
                <View style={[styles.field, styles.flex1]}>
                    <Text style={styles.label}>Número</Text>
                    <TextInput
                        style={[styles.input, errors.numero ? styles.inputError : null]}
                        value={numero}
                        onChangeText={setNumero}
                        placeholder="123"
                        keyboardType="default"
                    />
                    {renderError(errors.numero)}
                </View>
                <View style={[styles.field, styles.flex1]}>
                    <Text style={styles.label}>Complemento (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        value={complemento}
                        onChangeText={setComplemento}
                        placeholder="Apto, Bloco, etc."
                    />
                </View>
            </View>

            <View style={styles.fieldRow}>
                <View style={[styles.field, styles.flex1]}>
                    <Text style={styles.label}>Cidade</Text>
                    <TextInput
                        style={[styles.input, errors.cidade ? styles.inputError : null]}
                        value={cidade}
                        onChangeText={setCidade}
                        placeholder="Cidade"
                    />
                    {renderError(errors.cidade)}
                </View>
                <View style={[styles.field, styles.flex1]}>
                    <Text style={styles.label}>Estado</Text>
                    <TextInput
                        style={[styles.input, errors.estado ? styles.inputError : null]}
                        value={estado}
                        onChangeText={setEstado}
                        placeholder="UF"
                        maxLength={2}
                        autoCapitalize="characters"
                    />
                    {renderError(errors.estado)}
                </View>
            </View>

            <Text style={styles.sectionTitle}>Informações da Conta</Text>

            <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, errors.email ? styles.inputError : null]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="usuario@dominio.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {renderError(errors.email)}
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={[styles.input, errors.senha ? styles.inputError : null]}
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="••••••••"
                    secureTextEntry
                    autoCapitalize="none"
                />
                <Text style={styles.hint}>Use maiúsculas, minúsculas, números e especiais.</Text>
                {renderError(errors.senha)}
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                    style={[styles.input, errors.confirmarSenha ? styles.inputError : null]}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    placeholder="Repita a senha"
                    secureTextEntry
                    autoCapitalize="none"
                />
                {renderError(errors.confirmarSenha)}
            </View>

            <TouchableOpacity
                style={[styles.submitBtn, !allValid && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                disabled={!allValid}
            >
                <Text style={styles.submitText}>Enviar</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
    },
    subSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    complementarBox: {
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#FAFAFA',
    },
    field: {
        marginBottom: 12,
    },
    fieldRow: {
        flexDirection: 'row',
        gap: 12,
    },
    flex1: { flex: 1 },
    flex2: { flex: 2 },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: 'white',
    },
    inputError: {
        borderColor: '#E53935',
    },
    errorText: {
        color: '#E53935',
        fontSize: 12,
        marginTop: 4,
    },
    hint: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    submitBtn: {
        backgroundColor: '#2E7D32',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    submitBtnDisabled: {
        backgroundColor: '#9E9E9E',
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});
