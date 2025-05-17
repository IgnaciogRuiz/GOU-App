import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";

type Props = {
  origen: string;
  setOrigen: (value: string) => void;
  destino: string;
  setDestino: (value: string) => void;
  origenOptions: string[];
  destinoOptions: string[];
  onFilterPress?: () => void;
  onCalendarPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const inputLocation: React.FC<Props> = ({
  origen,
  setOrigen,
  destino,
  setDestino,
  origenOptions,
  destinoOptions,
  onFilterPress,
  onCalendarPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputsContainer}>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={origen}
            onValueChange={(value) => setOrigen(value)}
            style={styles.picker}
          >
            {origenOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerBox}>
          <Picker
            selectedValue={destino}
            onValueChange={(value) => setDestino(value)}
            style={styles.picker}
          >
            {destinoOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
          <Feather name="sliders" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCalendarPress} style={styles.iconButton}>
          <Feather name="calendar" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  inputsContainer: {
    flex: 1,
    gap: 10,
  },
  pickerBox: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 45,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  picker: {
    //height: 40,
    width: "100%",
  },
  iconsContainer: {
    justifyContent: "space-between",
    marginLeft: 8,
    height: 95,
  },
  iconButton: {
    padding: 8,
  },
});

export default inputLocation;