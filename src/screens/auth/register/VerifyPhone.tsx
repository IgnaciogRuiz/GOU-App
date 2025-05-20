import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { CustomButton, Title, BackButton } from '../../../components'
import { useAuthNavigation } from "../../../navigation/Navigation";

const CELL_COUNT = 6;

const VerificationScreen = () => {
  const navigation = useAuthNavigation();
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handleComenzar = () => {
    navigation.navigate("ProfileStepsScreen"); // Redirigir si querés
    console.log(
      "phone verified, later make a variable to put a check in the ProfileStepsScreen"
    );
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <Image
        source={require("../../../../assets/images/PhoneIcon.webp")} // Cambiá la ruta si tenés otro ícono
        style={styles.icon}
        resizeMode="contain"
      />

      <Title title="Codigo de" />
      <Title title="verificación" />

      <Text style={styles.emailInfo}>
        Verifica tu Telefono. Te llegara un SMS a **7096
      </Text>

      <TouchableOpacity>
        <Text style={styles.emailChange}>¿este no es tu numero?</Text>
      </TouchableOpacity>

      <Text style={styles.label}>codigo</Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <View style={styles.fall}>
        <CustomButton title="Verificar" onPress={handleComenzar} />
      </View>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  icon: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  emailInfo: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 8,
    color: "#444",
  },
  emailChange: {
    textAlign: "center",
    color: "#007AFF",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
    textTransform: "capitalize",
  },
  codeFieldRoot: {
    marginBottom: 20,
    justifyContent: "space-between",
  },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    textAlign: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  focusCell: {
    borderColor: "#007AFF",
  },
  cellText: {
    fontSize: 24,
  },
  button: {
    width: 500,
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
});
