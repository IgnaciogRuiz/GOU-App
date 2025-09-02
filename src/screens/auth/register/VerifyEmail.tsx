import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { CustomButton, Title, BackButton } from "../../../components";
import { useAuthNavigation } from "../../../navigation/Navigation";

const CELL_COUNT = 6;

const VerificationEmailDark = () => {
  const navigation = useAuthNavigation();
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.container}>
      <BackButton />

      <Image
        source={require("../../../../assets/images/email.png")}
        style={styles.icon}
        resizeMode="contain"
      />

      <Title style={{ color: "#fff" }}>Código de Verificación</Title>

      <Text style={styles.emailInfo}>
        Verifica tu email tunomb***@gmail.com
      </Text>

      <TouchableOpacity>
        <Text style={styles.emailChange}>¿Este no es tu email?</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Código</Text>

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
        <CustomButton
          title="Verificar"
          onPress={() => navigation.navigate("ProfileStepsScreen")}
        />
      </View>
    </View>
  );
};

export default VerificationEmailDark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // fondo oscuro
    justifyContent: "center",
  },
  icon: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 100,
    tintColor: "#ccc", // opcional, si querés que el ícono se ponga blanco
  },
  emailInfo: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 8,
    color: "#aaa", // gris claro
  },
  emailChange: {
    textAlign: "center",
    color: "#4DA6FF", // azul clarito
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#ccc",
    textTransform: "capitalize",
  },
  codeFieldRoot: {
    marginBottom: 20,
    justifyContent: "space-between",
  },
  cell: {
    width: 40,
    height: 50,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#444", // bordes grises oscuros
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E", // celda oscura
  },
  focusCell: {
    borderColor: "#4DA6FF", // azul cuando está seleccionada
  },
  cellText: {
    fontSize: 24,
    color: "#fff",
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
});
