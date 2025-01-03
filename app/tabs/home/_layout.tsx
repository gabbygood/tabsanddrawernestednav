import { Stack } from 'expo-router'

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name='details' options={{ title: 'Details' }} />
    </Stack>
  )
}
