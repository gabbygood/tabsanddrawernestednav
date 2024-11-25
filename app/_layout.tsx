import { Slot, router } from 'expo-router'
import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function GlobalLayout() {
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {/* Drawer */}
      {isDrawerOpen && (
        <View style={styles.drawer}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => setDrawerOpen(false)}
          >
            <Text style={styles.drawerItemText}>Close Drawer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              setDrawerOpen(false)
              router.push('/drawer/screen1')
            }}
          >
            <Text style={styles.drawerItemText}>Screen 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              setDrawerOpen(false)
              router.push('/drawer/screen2')
            }}
          >
            <Text style={styles.drawerItemText}>Screen 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              setDrawerOpen(false)
              router.push('/tabs/home')
            }}
          >
            <Text style={styles.drawerItemText}>Bottom Navigation</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.drawerToggle}
          onPress={() => setDrawerOpen(!isDrawerOpen)}
        >
          <Text style={styles.drawerToggleText}>☰</Text>
        </TouchableOpacity>
        {/* Render Nested Routes */}
        <Slot />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  drawer: {
    width: 200,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  drawerItem: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333',
  },
  drawerToggle: {
    padding: 10,
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
    margin: 10,
    borderRadius: 5,
  },
  drawerToggleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
