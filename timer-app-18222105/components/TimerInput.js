// Import komponen-komponen react native
import { View, StyleSheet, Text, Platform} from 'react-native';

// Import komponen picker dari react native picker
import { Picker } from '@react-native-picker/picker';

/**
 * Membuat array angka dari 0 hingga panjang tertentu.
 * @param {number} length - Panjang array.
 * @returns {string[]} Array string angka.
 */
const createArray = (length) => Array.from({ length }, (_, i) => i.toString());

const AVAILABLE_MINUTES = createArray(60);
const AVAILABLE_SECONDS = createArray(60);

/**
 * Komponen input untuk menit dan detik.
 * @param {number} minutes - Nilai menit saat ini.
 * @param {function} setMinutes - Fungsi untuk mengubah menit.
 * @param {number} seconds - Nilai detik saat ini.
 * @param {function} setSeconds - Fungsi untuk mengubah detik.
 */
const TimerInput = ({ minutes, setMinutes, seconds, setSeconds }) => {
  
  return (
    <View style={styles.container}>
      {/* Judul komponen menit dan detik */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleComponent}>Minutes</Text>
        <Text style={styles.titleComponent}>Seconds</Text>
      </View>

      {/* Picker */}
      <View style={styles.pickerContainer}>
        {/* Picker untuk menit */}
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={minutes.toString()}
          onValueChange={(itemValue) => setMinutes(parseInt(itemValue, 10))}
        >
          {AVAILABLE_MINUTES.map((value) => (
            <Picker.Item key={value} label={`${value}`} value={value} />
          ))}
        </Picker>

        {/* Separator dengan titik dua (:) */}
        <Text style={styles.separator}>:</Text>

        {/* Picker untuk detik */}
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={seconds.toString()}
          onValueChange={(itemValue) => setSeconds(parseInt(itemValue, 10))}
        >
          {AVAILABLE_SECONDS.map((value) => (
            <Picker.Item key={value} label={`${value}`} value={value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 50,
    marginBottom: 10,
  },
  titleComponent: {
    fontSize: 26,
    color: "#FFF",
    marginBottom: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    maxWidth: 120,
    ...Platform.select({
      android: {
        color: "#FFF",
        backgroundColor: "rgba(92, 92, 92, 0.206)",
      },
    }),
  },
  pickerItem: {
    color: "#FFF",
    fontSize: 20,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },
  separator: {
    fontSize: 40,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: "#FFF",
  },
});

export default TimerInput;