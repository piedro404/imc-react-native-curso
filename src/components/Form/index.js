import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)

    function imcCalculator() {
        return setImc((weight/(height*height)).toFixed(2))
    }

    function verificationImc() {
        if(imc == null){
            Vibration.vibrate()
            setErrorMessage("Campo Obrigatorio*")
        }
    }

    function validationImc() {
        if(weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é iqual:")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
            return;
        }

        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
        verificationImc()
    }   

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{ errorMessage }</Text>
                <TextInput
                    placeholder="Ex: 1.75"
                    keyboardType="numeric"
                    value={height}
                    onChangeText={setHeight}
                    style={styles.input}
                />
                
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{ errorMessage }</Text>
                <TextInput
                    placeholder="Ex: 75.365"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={() => {validationImc()}}
                    style={styles.buttonCalculator}
                >
                    <Text style={styles.textButtonCalculator}>{ textButton }</Text>
                </TouchableOpacity>
            </View>

            <ResultImc messageResultImc={messageImc} resultImc={imc} />
        </View>
    );
}