import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Title, CustomInput, CustomButton, OvalBackground} from '../../../components';
import { useAuthNavigation } from "../../../navigation/Navigation";

const PhoneInputScreen = () => {
  const [phone, setPhone] = useState("");
  const navigation = useAuthNavigation();
  const handleSubmit = () => {
    console.log("Número enviado:", phone);
    navigation.navigate("VerifyPhone");
    // lógica para enviar número
  };

  return (
    <View style={styles.container}>
      <Title title="Ingresa tu telefono" />

      <View style={styles.form}>
        <CustomInput
          value={phone}
          onChangeText={setPhone}
          // keyboardType="numeric"
        />
      </View>
      <View style={styles.fall}>
        <OvalBackground color="#000" direction="right" marginTop={100} />
        <Image
          source={require("../../../assets/images/carAbove.png")} // ajustá la ruta
          style={styles.carImage}
          resizeMode="contain"
        />
        <CustomButton title="Enviar" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default PhoneInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  form: {
    color: "#ccc",
    marginTop: 35,
    width: "90%",
  },
  carImage: {
    width: 350,
    height: 400,
    alignSelf: "flex-end",
    marginBottom: 75,
    transform: [{ rotate: "180deg" }],
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
});
