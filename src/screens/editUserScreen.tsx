import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal';
import { Country, CountryCode } from 'react-native-country-picker-modal';
import { MaskedTextInput } from 'react-native-mask-text';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { styles } from "../styles/editUserStyles";

interface Errors {
    nombre?: string;
    apellido?: string;
    usuario?: string;
    fechaNac?: string;
    telefono?: string;
    correo?: string;
    lugarEstudio?: string;
    periodoEstudio?: string;
    especializacion?: string;
    experienciaLaboral?: string;
    intereses?: string;
    enlaceGit?: string;
    enlaceLinkedIn?: string;
    disponibilidad?: string;
}

const EditUserScreen = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [countryCode, setCountryCode] = useState<CountryCode>('VE');
    const [callingCode, setCallingCode] = useState('58');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [errors, setErrors] = useState<Errors>({});
    const [form, setForm] = useState({
        nombre: 'Norelvis',
        apellido: 'Peraza',
        usuario: '@nore',
        fechaNac: '',
        telefono: '',
        correo: 'norelvisperaza@gmail.com',
        lugarEstudio: '',
        periodoEstudio: '',
        especializacion: '',
        experienciaLaboral: '',
        intereses: '',
        enlaceGit: '',
        enlaceLinkedIn: '',
        disponibilidad: '',
    });

    const interesesDisponibles = [
        "Arquitectura de Software",
        "Backend",
        "Bases de Datos",
        "Ciberseguridad",
        "Computación en la Nube",
        "Desarrollo Móvil",
        "Desarrollo Web",
        "DevOps",
        "Frontend",
        "Gerencia de procesos",
        "Inteligencia Artificial",
        "Machine Learning",
        "Marketing",
        "Metodologías Ágiles",
        "Mineria de Datos",
        "Modelos de Negocios",
        "QA",
        "Redes",
        "Sistemas",
        "Sistemas Operativos",
        "UI/UX"
    ];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };
    
    const toggleSelect = (interest: string) => {
        let updatedSelected;
        if (selected.includes(interest)) {
            updatedSelected = selected.filter((item) => item !== interest);
        } else {
            updatedSelected = [...selected, interest];
        }
    
        setSelected(updatedSelected);
        handleChange('intereses', updatedSelected.join(', ')); // update the status of the form
    };  

    const handleUpdateProfile = () => {
        let newErrors: Errors = {};
    
        // mandatory validations
        if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
        if (!form.apellido.trim()) newErrors.apellido = "El apellido es obligatorio.";
        if (!form.usuario.trim()) newErrors.usuario = "El usuario es obligatorio.";
        if (!form.fechaNac.trim()) newErrors.fechaNac = "La fecha de nacimiento es obligatoria.";
        if (!form.correo.trim()) newErrors.correo = "El correo electrónico es obligatorio.";
        if (!form.lugarEstudio.trim()) newErrors.lugarEstudio = "El lugar de estudio es obligatorio.";
        if (!form.periodoEstudio.trim()) newErrors.periodoEstudio = "El periodo de estudio es obligatorio.";
        if (selected.length === 0) newErrors.intereses = "Debes seleccionar al menos un interés.";
        if (!form.disponibilidad.trim()) newErrors.disponibilidad = "La disponibilidad es obligatoria.";
    
        // format validations
        if (form.nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre)) {
            newErrors.nombre = "El nombre solo debe contener letras.";
        }
        if (form.apellido && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.apellido)) {
            newErrors.apellido = "El apellido solo debe contener letras.";
        }
        if (form.usuario && !/^@[\w\d]+$/.test(form.usuario)) {
            newErrors.usuario = "El usuario debe comenzar con '@'.";
        }
        if (form.telefono && !/^\d{7,15}$/.test(form.telefono)) {
            newErrors.telefono = "El teléfono debe contener entre 7 y 15 números.";
        }
        if (form.correo && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.correo)) {
            newErrors.correo = "El correo no tiene un formato válido.";
        }
        if (form.enlaceGit && !/^https:\/\/.+/.test(form.enlaceGit)) {
            newErrors.enlaceGit = "El enlace de GitHub debe comenzar con 'https://'.";
        }
        if (form.enlaceLinkedIn && !/^https:\/\/.+/.test(form.enlaceLinkedIn)) {
            newErrors.enlaceLinkedIn = "El enlace de LinkedIn debe comenzar con 'https://'.";
        }
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) {
            Alert.alert(
                "Error",
                "Por favor verifica los campos");
            return false;
        }
    
        return true;
    };

    const handleUpdate = () => {
        if (handleUpdateProfile()) {
        Alert.alert(
            "Actualización exitosa",
            "Gracias por mantener tu información actualizada.",
            [
                { text: "Aceptar", onPress: () => navigation.navigate("MyUser") }
            ]
        );
        console.log("Actualización completada", form);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Mi Perfil</Text>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={profileImage ? { uri: profileImage } : require("../assets/images/profile-user.png")}
                        style={styles.profileImage}
                    />
                    <Text style={styles.editPhoto}>Editar Foto</Text>
                </TouchableOpacity>
            </View>

            {/* Name */}
            <View>
                <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu nombre"
                        placeholderTextColor="#888"
                        value={form.nombre}
                        onChangeText={(text) => setForm({ ...form, nombre: text })}
                    />
                </View>
                {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}
            </View>

            {/* Last name */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Apellido *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu apellido"
                        placeholderTextColor="#888"
                        value={form.apellido}
                        onChangeText={(text) => setForm({ ...form, apellido: text })}
                    />
                </View>
                {errors.apellido && <Text style={styles.error}>{errors.apellido}</Text>}
            </View>

            {/* User */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Usuario *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu usuario"
                        placeholderTextColor="#888"
                        value={form.usuario}
                        onChangeText={(text) => setForm({ ...form, usuario: text })}
                    />
                </View>
                {errors.usuario && <Text style={styles.error}>{errors.usuario}</Text>}
            </View>

            {/* Birthdate */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fecha de Nacimiento *</Text>

                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={{ fontFamily: "Roboto", color: form.fechaNac ? '#fff' : '#888' }}>
                            {form.fechaNac || 'Selecciona tu fecha de nacimiento'}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={birthDate || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            maximumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
                                    setBirthDate(selectedDate);
                                    handleChange('fechaNac', formattedDate);
                                }
                            }}
                        />
                    )}
                </View>
                {errors.fechaNac && <Text style={styles.error}>{errors.fechaNac}</Text>}
            </View>
            
            {/* Phone */}
            <View style={styles.containerPhone}>
                <Text style={styles.label}>Teléfono</Text>
                <View style={styles.phoneRow}>
                    <TouchableOpacity style={styles.countryPicker} onPress={() => setVisible(true)}>
                    <CountryPicker
                        withFilter
                        withFlag
                        withCallingCode
                        withModal
                        withEmoji={true}
                        countryCode={countryCode}
                        visible={visible}
                        onClose={() => setVisible(false)}
                        onSelect={(country: Country) => {
                            setCountryCode(country.cca2);
                            setCallingCode(country.callingCode[0]);
                        }}
                    />
                    <Text style={styles.callingCode}>+{callingCode}</Text>
                    </TouchableOpacity>

                    <TextInput
                    style={[styles.input, styles.phoneInput]}
                    placeholder="Número"
                    keyboardType="phone-pad"
                    placeholderTextColor="#888"
                    value={form.telefono}
                    onChangeText={(text) => setForm({ ...form, telefono: text })}
                    />
                </View>
                {errors.telefono && <Text style={styles.error}>{errors.telefono}</Text>}
            </View>

            {/* Email */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Correo Electrónico *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu correo electrónico"
                        placeholderTextColor="#888"
                        value={form.correo}
                        onChangeText={(text) => setForm({ ...form, correo: text })}
                    />
                </View>
                {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}
            </View>

            {/* Study place */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Lugar de Estudio *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu lugar de estudio"
                        placeholderTextColor="#888"
                        value={form.lugarEstudio}
                        onChangeText={(text) => setForm({ ...form, lugarEstudio: text })}
                    />
                </View>
                {errors.lugarEstudio && <Text style={styles.error}>{errors.lugarEstudio}</Text>}
            </View>

            {/* Study period */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Periodo de Estudio *</Text>
                    <MaskedTextInput
                    mask="9999 - 9999"
                    onChangeText={(text) => setForm({ ...form, periodoEstudio: text })}
                    value={form.periodoEstudio}
                    keyboardType="numeric"
                    placeholder="2020 - 2025"
                    placeholderTextColor="#888"
                    style={styles.input}
                    />
                </View>
                {errors.periodoEstudio && <Text style={styles.error}>{errors.periodoEstudio}</Text>}
            </View>

            {/* Specialization */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Especialización</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu especialización"
                        placeholderTextColor="#888"
                        value={form.especializacion}
                        onChangeText={(text) => setForm({ ...form, especializacion: text })}
                    />
                </View>
                {errors.especializacion && <Text style={styles.error}>{errors.especializacion}</Text>}
            </View>

            {/* Work experience */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Experiencia Laboral</Text>
                    <TextInput
                        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
                        placeholder="Ingresa tu experiencia laboral"
                        placeholderTextColor="#888"
                        value={form.experienciaLaboral}
                        onChangeText={(text) => setForm({ ...form, experienciaLaboral: text })}
                        multiline={true}
                        maxLength={1000}
                    />
                    <Text style={styles.characterCount}>
                        {form.experienciaLaboral.length}/1000 caracteres permitidos
                    </Text>
                </View>
                {errors.experienciaLaboral && <Text style={styles.error}>{errors.experienciaLaboral}</Text>}
            </View>

            {/* Interests */}
            <View>
                <Text style={styles.label}>Intereses *</Text>
                <View style={styles.optionsContainer}>
                    {interesesDisponibles.map((interes, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                        styles.option,
                        selected.includes(interes) && styles.selectedOption
                        ]}
                        onPress={() => toggleSelect(interes)}
                    >
                        <Text style={[
                        styles.optionText,
                        selected.includes(interes) && styles.selectedOptionText
                        ]}>
                        {interes}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>
                
                <View style={styles.optionsSelect}>
                    <View>
                        {/* Chips selected */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                            {selected.map((item, idx) => (
                            <View key={idx} style={styles.chip}>
                                <Text style={styles.chipText}>{item}</Text>
                                <TouchableOpacity onPress={() => toggleSelect(item)}>
                                <Ionicons name="close-circle" size={18} color="#555" />
                                </TouchableOpacity>
                            </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                {errors.intereses && <Text style={styles.error}>{errors.intereses}</Text>}
            </View>

            {/* GitHub */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enlace de Git</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa el link de tu portafolio"
                        placeholderTextColor="#888"
                        value={form.enlaceGit}
                        onChangeText={(text) => setForm({ ...form, enlaceGit: text })}
                    />
                </View>
                {errors.enlaceGit && <Text style={styles.error}>{errors.enlaceGit}</Text>}
            </View>

            {/* LinkedIn */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enlace de LinkedIn</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa el link de tu usuario"
                        placeholderTextColor="#888"
                        value={form.enlaceLinkedIn}
                        onChangeText={(text) => setForm({ ...form, enlaceLinkedIn: text })}
                    />
                </View>
                {errors.enlaceLinkedIn && <Text style={styles.error}>{errors.enlaceLinkedIn}</Text>}
            </View>

            {/* Availability */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Disponibilidad como colaborador *</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={form.disponibilidad}
                        onValueChange={(value) => handleChange("disponibilidad", value)}
                        style={styles.picker}
                        dropdownIconColor="#fff"
                    >
                        <Picker.Item label="Seleccione..." value="" />
                        <Picker.Item label="Sí" value="Sí" />
                        <Picker.Item label="No" value="No" />
                    </Picker>
                </View>
                {errors.disponibilidad && <Text style={styles.error}>{errors.disponibilidad}</Text>}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Actualizar Datos</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditUserScreen;