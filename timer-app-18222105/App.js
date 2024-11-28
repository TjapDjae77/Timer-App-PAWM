// Import komponen-komponen react dan react native
import { useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

// Import file-file components di dalam Snack
import TimerInput from './components/TimerInput';
import Timer from './components/Timer';

/**
 * Aplikasi utama untuk timer.
 * Mengelola input menit dan detik, start, dan reset timer.
 */

export default function App() {
  // State untuk menit, detik, nilai awal, dan tampilan timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  // Fungsi untuk memulai timer
  const handleStartTimer = () => {
    setInitialMinutes(minutes);
    setInitialSeconds(seconds);
    setShowTimer(true); // Membuka halaman Timer.js
  };

  // Fungsi untuk mereset timer ke nilai awal
  const handleResetTimer = useCallback(() => {
    setShowTimer(false); // Menutup halaman Timer.js dan kembali ke TimerInput.js
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  }, [initialMinutes, initialSeconds]);

  // Tombol Start hanya aktif (bisa di-klik) jika menit dan detik tidak nol
  const isStartDisabled = minutes === 0 && seconds === 0;

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>Timer</Text>
      {/* Tampilan input (belum dimulai) atau timer (sudah dimulai) */}
      {!showTimer ? (
        <TimerInput
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
        />
      ) : (
        <Timer
          initialMinutes={minutes}
          initialSeconds={seconds}
          onReset={handleResetTimer}
        />
      )}

      {/* Tombol Start */}
      {!showTimer && (
        <TouchableOpacity
          onPress={handleStartTimer}
          style={[
            styles.startButton,
            isStartDisabled ? styles.disabledButton : styles.enabledButton,
          ]}
          disabled={isStartDisabled}>
          <Text style={styles.startButtonText}>Start Timer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F071C', // Warna Raisin Black
    padding: 20,
  },
  title: {
    position: 'absolute',
    top: 90,
    left: 40,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  startButton: {
    position: 'absolute',
    bottom: 120,
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 30,
    alignItems: 'center',
  },
  enabledButton: {
    // Tombol start saat sudah aktif
    backgroundColor: '#4CAF50', // Warna Pigmen Green
  },
  disabledButton: {
    // Tombol start saat belum aktif
    backgroundColor: '#CCC', // Warna Silver
  },
  startButtonText: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
