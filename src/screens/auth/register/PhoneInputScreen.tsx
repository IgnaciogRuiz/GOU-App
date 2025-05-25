import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Title,
  CustomInput,
  CustomButton,
  OvalBackground,
} from "../../../components";

const PhoneInputScreen = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    console.log("Número enviado:", phone);
    // lógica para enviar número
  };

  return (
    <View style={styles.container}>
      <Title title="Ingresa tu telefono" />

      <CustomInput
        placeholder="telefono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <View style={styles.fall}>
        <OvalBackground color="#000" direction="right" marginTop={200} />
        <Image
          source={require("../../../../assets/images/carAbove.png")} // ajustá la ruta
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
  },
  carImage: {
    width: 200,
    height: 200,
    alignSelf: "flex-end",
    marginTop: 30,
    marginBottom: 30,
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
});
