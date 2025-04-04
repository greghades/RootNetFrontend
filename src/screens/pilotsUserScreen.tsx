import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../styles/pilotsUserStyles';

const PrivacyPolicyScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.content}>
            <View style={styles.container}>
                <Text style={styles.title}>Políticas de Privacidad</Text>
                    <Text style={styles.text}>
                    Bienvenido a RootNet, la red social exclusiva para ingenieros en informática. Nos comprometemos a proteger tu privacidad y a garantizar que tus datos sean utilizados de manera segura y responsable.
                    </Text>

                    <Text style={styles.sectionTitle}>1. Información que recopilamos</Text>
                    <Text style={styles.text}>
                    Recopilamos información necesaria para validar tu identidad como ingeniero en informática, incluyendo:
                    </Text>
                    <Text style={styles.text}>- Nombre completo</Text>
                    <Text style={styles.text}>- Correo institucional o personal</Text>
                    <Text style={styles.text}>- Datos de perfil como foto y experiencia</Text>
                    <Text style={styles.text}>- Información de interacción dentro de RootNet</Text>

                    <Text style={styles.sectionTitle}>2. Uso de la información</Text>
                    <Text style={styles.text}>
                    La información que recopilamos se usa para:
                    </Text>
                    <Text style={styles.text}>- Verificar que eres ingeniero en informática</Text>
                    <Text style={styles.text}>- Mejorar la experiencia dentro de la plataforma</Text>
                    <Text style={styles.text}>- Conectar a profesionales con intereses afines</Text>

                    <Text style={styles.sectionTitle}>3. Derechos del usuario</Text>
                    <Text style={styles.text}>
                    Tienes derecho a:
                    </Text>
                    <Text style={styles.text}>- Acceder a tus datos y actualizarlos</Text>
                    <Text style={styles.text}>- Eliminar y actualizar tus publicaciones dentro {'\n'}de las 24h luego de publicarlas</Text>
                    <Text style={styles.text}>- Actualizar tu contraseña para mejorar la seguridad de tus datos</Text>

                    <Text style={styles.sectionTitle}>4. Seguridad de los datos</Text>
                    <Text style={styles.text}>
                    -RootNet implementa medidas de seguridad avanzadas para proteger tu información contra accesos no autorizados.
                    </Text>

                    <Text style={styles.sectionTitle}>5. Contacto</Text>
                    <Text style={[styles.text, styles.textLast]}>
                    -Si tienes preguntas sobre nuestras políticas, puedes contactarnos en: soporte@rootnet.com
                    </Text>
            </View>
        </ScrollView>
    );
};

export default PrivacyPolicyScreen;