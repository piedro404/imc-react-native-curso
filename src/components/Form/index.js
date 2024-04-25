import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Keyboard,
  Pressable,
  FlatList,
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);

  function imcCalculator() {
    let heightFormat = height.replace(",", ".");
    let weightFormat = weight.replace(",", ".");
    let totalImc = (weightFormat / (heightFormat * heightFormat)).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
    return setImc(totalImc);
  }

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("Campo Obrigatorio*");
    }
  }

  function validationImc() {
    if (weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu IMC é iqual:");
      setTextButton("Calcular Novamente");
      setErrorMessage(null);
      Keyboard.dismiss();
    } else {
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e altura");
      verificationImc();
    }
  }

  return (
    <View style={styles.formContext}>
      {imc === null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            placeholder="Ex: 1.75"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            style={styles.input}
          />

          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            placeholder="Ex: 80"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => {
              validationImc();
            }}
            style={styles.buttonCalculator}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.showResult}>
          <ResultImc messageResultImc={messageImc} resultImc={imc} />

          <TouchableOpacity
            onPress={() => {
              validationImc();
            }}
            style={styles.buttonCalculator}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({ item }) => {
          return(
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultImcList}>Resultado IMC = </Text>
              {item.imc}
            </Text>
          )
        }}
        keyExtractor={( item ) => 
          item.id
        }
      ></FlatList>
    </View>
  );
}
