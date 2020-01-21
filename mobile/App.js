import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Github</Text>
      <Text style={styles.content}>Desenvolvido por Neide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0aa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 50,
    color: '#FFF',
    fontWeight: "bold",
  },

  content: {
    color: '#FFF',
  }
});
