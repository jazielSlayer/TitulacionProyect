import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCarreras, getEstudiantes, getProfesores, getProyectos } from '../api';
import Layout from '../components/layout';

const HomeScreen = ({ route }) => {
  const { user } = route.params;
  const [stats, setStats] = useState({
    carreras: 0,
    estudiantes: 0,
    profesores: 0,
    proyectos: 0,
  });

  const loadStats = async () => {
    try {
      const [carreras, estudiantes, profesores, proyectos] = await Promise.all([
        getCarreras(),
        getEstudiantes(),
        getProfesores(),
        getProyectos(),
      ]);
      setStats({
        carreras: carreras.length,
        estudiantes: estudiantes.length,
        profesores: profesores.length,
        proyectos: proyectos.length,
      });
    } catch (error) {
      console.error('Error en loadStats:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const renderContent = () => {
    switch (user.tipo_usuario) {
      case 'admin':
        return (
          <>
            <Text style={styles.title}>Bienvenido, Administrador</Text>
            <Text style={styles.stat}>Carreras: {stats.carreras}</Text>
            <Text style={styles.stat}>Estudiantes: {stats.estudiantes}</Text>
            <Text style={styles.stat}>Profesores: {stats.profesores}</Text>
            <Text style={styles.stat}>Proyectos: {stats.proyectos}</Text>
          </>
        );
      case 'estudiante':
        return (
          <>
            <Text style={styles.title}>Bienvenido, Estudiante</Text>
            <Text style={styles.stat}>Proyectos Activos: {stats.proyectos}</Text>
          </>
        );
      case 'profesor':
        return (
          <>
            <Text style={styles.title}>Bienvenido, Profesor</Text>
            <Text style={styles.stat}>Proyectos Asignados: {stats.proyectos}</Text>
          </>
        );
      default:
        return <Text style={styles.title}>Bienvenido</Text>;
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        {renderContent()}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  title: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  stat: { color: '#ffffff', fontSize: 18, marginVertical: 10 },
});

export default HomeScreen;