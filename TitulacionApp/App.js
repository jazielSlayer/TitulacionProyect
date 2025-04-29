import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import CarreraScreen from "./screens/CarreraScreen";
import EstudianteScreen from "./screens/EstudianteScreen";
import ProfesorScreen from "./screens/ProfesorScreen";
import ProyectoScreen from "./screens/ProyectoScreen";
import EvaluacionScreen from "./screens/EvaluacionScreen";
import DocumentoScreen from "./screens/DocumentoScreen";

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (loggedUser, goToRegister = false) => {
    if (loggedUser) {
      console.log('Usuario logueado:', loggedUser);
      setUser(loggedUser);
    }
    if (goToRegister) setShowRegister(true);
    else setShowRegister(false);
  };

  const handleRegister = () => setShowRegister(false);

  if (!user) {
    return showRegister ? <RegisterScreen onRegister={handleRegister} /> : <LoginScreen onLogin={handleLogin} />;
  }

  const AdminDrawer = () => (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: { backgroundColor: '#222f3e', width: 250 },
        drawerLabelStyle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
        headerStyle: { backgroundColor: '#222f3e' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ user }}
        options={{ title: "Inicio" }}
      />
      <Drawer.Screen
        name="Carreras"
        component={CarreraScreen}
        options={{ title: "Carreras" }}
      />
      <Drawer.Screen
        name="Estudiantes"
        component={EstudianteScreen}
        options={{ title: "Estudiantes" }}
      />
      <Drawer.Screen
        name="Profesores"
        component={ProfesorScreen}
        options={{ title: "Profesores" }}
      />
      <Drawer.Screen
        name="Proyectos"
        component={ProyectoScreen}
        options={{ title: "Proyectos de Titulación" }}
      />
      <Drawer.Screen
        name="Evaluaciones"
        component={EvaluacionScreen}
        options={{ title: "Evaluaciones" }}
      />
      <Drawer.Screen
        name="Documentos"
        component={DocumentoScreen}
        options={{ title: "Documentos" }}
      />
    </Drawer.Navigator>
  );

  const roleScreens = {
    estudiante: [
      <Tab.Screen
        key="Home"
        name="Home"
        component={HomeScreen}
        initialParams={{ user }}
        options={{ title: "Inicio" }}
      />,
      <Tab.Screen
        key="Proyectos"
        name="Proyectos"
        component={ProyectoScreen}
        options={{ title: "Mis Proyectos" }}
      />,
    ],
    profesor: [
      <Tab.Screen
        key="Home"
        name="Home"
        component={HomeScreen}
        initialParams={{ user }}
        options={{ title: "Inicio" }}
      />,
      <Tab.Screen
        key="Proyectos"
        name="Proyectos"
        component={ProyectoScreen}
        options={{ title: "Proyectos Asignados" }}
      />,
      <Tab.Screen
        key="Evaluaciones"
        name="Evaluaciones"
        component={EvaluacionScreen}
        options={{ title: "Evaluaciones" }}
      />,
    ],
    admin: [<Drawer.Screen key="AdminDrawer" name="AdminDrawer" component={AdminDrawer} options={{ title: "Menú" }} />],
  };

  const screens = roleScreens[user.tipo_usuario] || [];

  if (screens.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Rol de usuario no válido: {user.tipo_usuario}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Titulacion-App</Text>
          </View>
          <View style={styles.tabContainer}>
            {user.tipo_usuario === 'admin' ? (
              <AdminDrawer />
            ) : (
              <Tab.Navigator
                screenOptions={{
                  tabBarStyle: { backgroundColor: '#222f3e' },
                  tabBarLabelStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
                  tabBarIndicatorStyle: { backgroundColor: '#1e90ff' },
                  tabBarPosition: 'bottom',
                  tabBarScrollEnabled: true,
                }}
              >
                {screens}
              </Tab.Navigator>
            )}
          </View>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1e90ff' },
  container: { flex: 1 },
  header: { backgroundColor: '#222f3e', padding: 15, alignItems: 'flex-start' },
  headerTitle: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  tabContainer: { flex: 1 },
  errorText: { color: '#ffffff', fontSize: 18, textAlign: 'center', marginTop: 20 },
});

export default App;