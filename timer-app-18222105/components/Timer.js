// Import komponen-komponen react dan react native
import { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Import animasi progress timer dalam bentuk lingkaran
import { AnimatedCircularProgress } from 'react-native-circular-progress';

/**
 * Komponen Timer untuk menghitung waktu mundur (countdown).
 * @param {number} initialMinutes - Nilai awal menit.
 * @param {number} initialSeconds - Nilai awal detik.
 * @param {function} onReset - Fungsi untuk mereset timer.
 */

/* Penggunaan Input Props untuk menyesuaikan waktu awal timer */
const Timer = ({ initialMinutes, initialSeconds, onReset }) => {
  const totalTime = initialMinutes * 60 + initialSeconds; // Total waktu dalam detik
  /* Pemanfaatan state untuk mengelola waktu yang berjalan */
  const [time, setTime] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(true);

  // Penggunaan side effect dengan useEffect untuk mengatur interval timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval); // Menghentikan interval ketika waktu sudah habis
            onReset(); // Memanggil fungsi reset (kembali ke awal)
            return 0; // Set waktu ke 0
          }
          return prevTime - 1; // Mengurangi waktu setiap satuan delay
        });
      }, 1000); // Delay selama 1000ms (1 detik)
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, onReset]);

  // Penggunaan JSX untuk menampilkan waktu dalam format (mm:ss) di layar
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60); // Pembulatan pembagian ke bawah
    const seconds = timeInSeconds % 60; // Sisa hasil bagi
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2,'0')}`;
    /* Menggunakan method padStart untuk menambahkan karakter 0 ketika digitnya sepanjang satu digit misalnya ketika menit bernilai 5, maka yang tampil "05" bukan hanya "5" */
  };

  const progress = (time / totalTime) * 100; // Persentase progress timer

  return (
    <View style={styles.container}>
      {/* Animasi progress timer dalam bentuk lingkaran */}
      <AnimatedCircularProgress
        size={300}
        width={15}
        fill={progress} /* Mengisi lingkaran dengan persentase progress */
        tintColor="#6D72C3" /* Warna progress */
        backgroundColor="#3d5875" /* Warna background progress */
        rotation={0}
        lineCap="round">
        {/* Terdapat keterangan sisa waktu timer di tengah-tengah animasi lingkaran */}
        {() => <Text style={styles.timerText}>{formatTime(time)}</Text>}
      </AnimatedCircularProgress>

      <View style={styles.buttonContainer}>
        {/* Tombol Reset */}
        <TouchableOpacity
          onPress={onReset}
          style={[styles.button, styles.resetButton]}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        {/* Tombol Pause atau Play */}
        <TouchableOpacity
          onPress={() => setIsRunning(!isRunning)} /* Toggle state isRunning */
          style={[
            styles.button,
            styles.playPauseButton,
            styles.fixedWidthButton,
          ]}>
          <Text style={styles.buttonText}>
            {/* Jika timer berjalan, yang muncul tulisan "Pause", sebaliknya yang muncul 
            tulisan "Play" */}
            {isRunning ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    gap: 25,
    bottom: 100,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseButton: {
    backgroundColor: '#6D72C3', // Warna Medium Slate Blue
  },
  resetButton: {
    backgroundColor: '#F64740', // Warna Vermilion
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  fixedWidthButton: {
    width: 165, // Menetapkan lebar yang fixed pada tombol
  },
});

export default Timer;
