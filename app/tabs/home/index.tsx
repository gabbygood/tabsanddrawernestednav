import { View, Text, StyleSheet, Button } from 'react-native'
import { router } from 'expo-router'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <Button
        title='Go to Details'
        onPress={() => router.push('/tabs/home/details')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
})
