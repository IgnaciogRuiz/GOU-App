import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useGetVehicles, useGetTags, useCreateTrip } from '../../hooks';

// Colores del tema
const colors = {
  primary: '#2563eb',
  secondary: '#111827',
  accent: '#10B981',
  background: '#000000',
  gray800: '#1f2937',
  gray700: '#374151',
  gray400: '#9ca3af',
  white: '#ffffff',
  red500: '#ef4444',
};

// Componente Progress Bar
const ProgressBar = ({ currentStep, totalSteps, onBack }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <View style={styles.progressLeft}>
          {onBack && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Icon name="arrow-left" size={16} color="#9ca3af" />
            </TouchableOpacity>
          )}
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>Paso {currentStep} de {totalSteps}</Text>
          </View>
        </View>
        <View style={styles.progressRight}>
          <Text style={styles.progressPercentage}>{percentage}%</Text>
        </View>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

// Componente Input con icono
const InputWithIcon = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  leftIcon, 
  rightIcon, 
  onRightIconPress,
  multiline = false,
  keyboardType = 'default'
}) => (
  <View style={styles.inputSection}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputContainer}>
      {leftIcon && (
        <View style={styles.leftIconContainer}>
          {leftIcon}
        </View>
      )}
      <TextInput
        style={[
          styles.textInput,
          leftIcon && styles.textInputWithLeftIcon,
          rightIcon && styles.textInputWithRightIcon,
          multiline && styles.multilineInput
        ]}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
      {rightIcon && (
        <TouchableOpacity style={styles.rightIconContainer} onPress={onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  </View>
);

/*------------------------------------------------------------
------------------STEP 1: ORIGEN Y DESTINO--------------------
------------------------------------------------------------*/
const Step1 = ({ formData, updateFormData }) => {
  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>¿Cuál es tu próximo destino?</Text>
        <Text style={styles.stepSubtitle}>Empecemos con tu ruta de viaje.</Text>
      </View>

      <InputWithIcon
        label="Origen"
        placeholder="Ingrese el lugar de origen"
        value={formData.origin}
        onChangeText={(text) => updateFormData('origin', text)}
        leftIcon={<View style={[styles.locationDot, { backgroundColor: colors.primary }]} />}
        rightIcon={<Icon name="location-crosshairs" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Ubicación', 'Obteniendo ubicación actual...')}
      />

      <InputWithIcon
        label="Destino"
        placeholder="Ingrese el destino"
        value={formData.destination}
        onChangeText={(text) => updateFormData('destination', text)}
        leftIcon={<View style={[styles.locationDot, { backgroundColor: colors.red500 }]} />}
        rightIcon={<Icon name="map" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Mapa', 'Abriendo mapa...')}
      />

      <View style={styles.mapPreview}>
        <Icon name="map" size={32} color="#4b5563" />
        <Text style={styles.mapText}>La ruta aparecerá aquí</Text>
      </View>
    </ScrollView>
  );
};

/*------------------------------------------------------------
---------------STEP 2: FECHA Y HORA DE SALIDA-----------------
------------------------------------------------------------*/
const Step2 = ({ formData, updateFormData }) => {
  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>¿Cuándo sales?</Text>
        <Text style={styles.stepSubtitle}>Ingresa la fecha y hora de salida</Text>
      </View>

      <InputWithIcon
        label="Fecha (YYYY-MM-DD)"
        placeholder="2025-01-15"
        value={formData.date}
        onChangeText={(text) => updateFormData('date', text)}
        leftIcon={null}
        rightIcon={<Icon name="calendar-days" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Calendario', 'Selector de fecha')}
      />

      <View style={styles.infoCard}>
        <Icon name="info-circle" size={16} color={colors.primary} />
        <Text style={styles.infoText}>
          Formato: Año-Mes-Día (Ejemplo: 2025-01-15)
        </Text>
      </View>
    </ScrollView>
  );
};

/*------------------------------------------------------------
----------------STEP 3: VEHÍCULO Y ASIENTOS------------------
------------------------------------------------------------*/
const Step3 = ({ formData, updateFormData, vehicles, loadingVehicles }) => {
  if (loadingVehicles) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando vehículos...</Text>
      </View>
    );
  }

  const adjustSeats = (increment) => {
    const currentSeats = parseInt(formData.available_seats) || 1;
    const newSeats = Math.max(1, Math.min(8, currentSeats + increment));
    updateFormData('available_seats', newSeats.toString());
  };

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Tu vehículo</Text>
        <Text style={styles.stepSubtitle}>Selecciona tu auto y los asientos disponibles</Text>
      </View>

      <View style={styles.vehicleSection}>
        <Text style={styles.sectionTitle}>Selecciona vehículo</Text>
        {vehicles.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="car" size={48} color={colors.gray400} />
            <Text style={styles.emptyText}>No tienes vehículos registrados</Text>
            <Text style={styles.emptySubtext}>Agrega un vehículo en tu perfil</Text>
          </View>
        ) : (
          vehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleCard,
                formData.vehicle_id === vehicle.id && styles.vehicleCardSelected
              ]}
              onPress={() => updateFormData('vehicle_id', vehicle.id)}
            >
              <View style={styles.vehicleInfo}>
                <Icon
                  name="car"
                  size={24}
                  color={formData.vehicle_id === vehicle.id ? colors.primary : '#6b7280'}
                />
                <View style={styles.vehicleDetails}>
                  <Text style={styles.vehicleName}>
                    {vehicle.brand} {vehicle.model}
                  </Text>
                  <Text style={styles.vehicleSpecs}>
                    {vehicle.color} • {vehicle.license_plate}
                  </Text>
                </View>
              </View>
              <Icon
                name={formData.vehicle_id === vehicle.id ? "check-circle" : "circle"}
                size={20}
                color={formData.vehicle_id === vehicle.id ? colors.primary : '#d1d5db'}
              />
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={styles.seatsSection}>
        <Text style={styles.sectionTitle}>Asientos disponibles</Text>
        <View style={styles.seatsControl}>
          <View style={styles.seatsButtons}>
            <TouchableOpacity
              style={styles.seatButton}
              onPress={() => adjustSeats(-1)}
            >
              <Icon name="minus" size={16} color="#4b5563" />
            </TouchableOpacity>
            <Text style={styles.seatsNumber}>{formData.available_seats || '1'}</Text>
            <TouchableOpacity
              style={styles.seatButton}
              onPress={() => adjustSeats(1)}
            >
              <Icon name="plus" size={16} color="#4b5563" />
            </TouchableOpacity>
          </View>
          <View style={styles.seatsInfo}>
            <Text style={styles.seatsLabel}>Asientos</Text>
            <Text style={styles.seatsTotal}>disponibles</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

/*------------------------------------------------------------
----------------STEP 4: PRECIO Y ETIQUETAS------------------
------------------------------------------------------------*/
const Step4 = ({ formData, updateFormData, tags, loadingTags }) => {
  if (loadingTags) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando etiquetas...</Text>
      </View>
    );
  }

  const toggleTag = (tagId) => {
    const currentTags = formData.tagIds || [];
    let newTags;
    
    if (currentTags.includes(tagId)) {
      newTags = currentTags.filter(id => id !== tagId);
    } else {
      newTags = [...currentTags, tagId];
    }
    
    updateFormData('tagIds', newTags);
  };

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Precio y detalles</Text>
        <Text style={styles.stepSubtitle}>Define el precio y características del viaje</Text>
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.sectionTitle}>Precio por asiento</Text>
        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.priceInput}
            value={formData.price}
            onChangeText={(text) => updateFormData('price', text)}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#6b7280"
          />
        </View>
        <View style={styles.priceHint}>
          <Text style={styles.priceHintText}>💡 Precio sugerido: $5.000-15.000 por asiento</Text>
          <Text style={styles.priceHintSubtext}>Basado en costos de combustible y peajes</Text>
        </View>
      </View>

      {tags.length > 0 && (
        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Etiquetas del viaje (opcional)</Text>
          <Text style={styles.tagsSubtitle}>Selecciona las características de tu viaje</Text>
          <View style={styles.tagsGrid}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                style={[
                  styles.tagCard,
                  formData.tagIds?.includes(tag.id) && styles.tagCardSelected
                ]}
                onPress={() => toggleTag(tag.id)}
              >
                <Text style={[
                  styles.tagName,
                  formData.tagIds?.includes(tag.id) && styles.tagNameSelected
                ]}>
                  {tag.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

/*------------------------------------------------------------
----------------STEP 5: REVISAR Y CONFIRMAR------------------
------------------------------------------------------------*/
const Step5 = ({ formData, setCurrentStep, vehicles, tags, acceptTerms, setAcceptTerms }) => {
  const selectedVehicle = vehicles.find(v => v.id === formData.vehicle_id);
  const selectedTags = tags.filter(t => formData.tagIds?.includes(t.id));

  const totalEarnings = (parseFloat(formData.price) || 0) * (parseInt(formData.available_seats) || 1);

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Revisar y Confirmar</Text>
        <Text style={styles.stepSubtitle}>Revisa los detalles antes de publicar</Text>
      </View>

      {/* Ruta */}
      <View style={styles.reviewSection}>
        <View style={styles.reviewSectionHeader}>
          <View style={styles.reviewIconContainer}>
            <Icon name="map-location-dot" size={20} color={colors.accent} />
          </View>
          <View style={styles.reviewSectionInfo}>
            <Text style={styles.reviewSectionTitle}>Ruta</Text>
            <Text style={styles.reviewSectionSubtitle}>
              {formData.origin || 'Sin origen'} → {formData.destination || 'Sin destino'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setCurrentStep(1)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fecha */}
      <View style={styles.reviewSection}>
        <View style={styles.reviewSectionHeader}>
          <View style={styles.reviewIconContainer}>
            <Icon name="calendar-days" size={20} color={colors.primary} />
          </View>
          <View style={styles.reviewSectionInfo}>
            <Text style={styles.reviewSectionTitle}>Fecha</Text>
            <Text style={styles.reviewSectionSubtitle}>
              {formData.date || 'Sin fecha'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setCurrentStep(2)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Vehículo */}
      {selectedVehicle && (
        <View style={styles.reviewSection}>
          <View style={styles.reviewSectionHeader}>
            <View style={styles.reviewIconContainer}>
              <Icon name="car" size={20} color={colors.gray400} />
            </View>
            <View style={styles.reviewSectionInfo}>
              <Text style={styles.reviewSectionTitle}>
                {selectedVehicle.brand} {selectedVehicle.model}
              </Text>
              <Text style={styles.reviewSectionSubtitle}>
                {selectedVehicle.color} • {selectedVehicle.license_plate}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setCurrentStep(3)}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Asientos y Precio */}
      <View style={styles.reviewSection}>
        <View style={styles.reviewSectionHeader}>
          <View style={styles.reviewIconContainer}>
            <Icon name="dollar-sign" size={20} color={colors.accent} />
          </View>
          <View style={styles.reviewSectionInfo}>
            <Text style={styles.reviewSectionTitle}>
              ${formData.price || '0'} por asiento
            </Text>
            <Text style={styles.reviewSectionSubtitle}>
              {formData.available_seats || '1'} asientos • Total: ${totalEarnings.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setCurrentStep(4)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Etiquetas */}
      {selectedTags.length > 0 && (
        <View style={styles.reviewSection}>
          <View style={styles.reviewSectionHeader}>
            <View style={styles.reviewIconContainer}>
              <Icon name="tag" size={20} color={colors.primary} />
            </View>
            <View style={styles.reviewSectionInfo}>
              <Text style={styles.reviewSectionTitle}>Etiquetas</Text>
              <Text style={styles.reviewSectionSubtitle}>
                {selectedTags.map(t => t.name).join(' • ')}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setCurrentStep(4)}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Advertencia */}
      <View style={styles.beforePublishSection}>
        <View style={styles.warningContainer}>
          <Icon name="triangle-exclamation" size={20} color="#f59e0b" />
          <Text style={styles.warningTitle}>Antes de publicar</Text>
        </View>
        <View style={styles.warningList}>
          <Text style={styles.warningItem}>• Verifica que todos los datos sean correctos</Text>
          <Text style={styles.warningItem}>• Asegúrate de llegar puntualmente</Text>
          <Text style={styles.warningItem}>• Mantén comunicación con los pasajeros</Text>
          <Text style={styles.warningItem}>• Conduce con seguridad</Text>
        </View>
      </View>

      {/* Términos */}
      <View style={styles.termsSection}>
        <TouchableOpacity 
          style={styles.termsCheckbox}
          onPress={() => setAcceptTerms(!acceptTerms)}
        >
          <View style={[styles.checkbox, acceptTerms && styles.checkboxSelected]}>
            {acceptTerms && <Icon name="check" size={14} color={colors.white} />}
          </View>
          <Text style={styles.termsText}>
            Acepto los <Text style={styles.termsLink}>Términos de Servicio</Text> y confirmo que toda la información es correcta.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Componente principal
export default function PublishTripScreen() {
  const { vehicles, loading: loadingVehicles } = useGetVehicles();
  const { tags, loading: loadingTags } = useGetTags();
  const { publishTrip, loading: creating } = useCreateTrip();

  const [currentStep, setCurrentStep] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    available_seats: '1',
    price: '',
    vehicle_id: '',
    tagIds: [],
  });

  const totalSteps = 5;

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.origin || !formData.destination) {
          Alert.alert('Error', 'Completa origen y destino');
          return false;
        }
        break;
      case 2:
        if (!formData.date) {
          Alert.alert('Error', 'Ingresa la fecha del viaje');
          return false;
        }
        break;
      case 3:
        if (!formData.vehicle_id) {
          Alert.alert('Error', 'Selecciona un vehículo');
          return false;
        }
        break;
      case 4:
        if (!formData.price || parseFloat(formData.price) <= 0) {
          Alert.alert('Error', 'Ingresa un precio válido');
          return false;
        }
        break;
      case 5:
        if (!acceptTerms) {
          Alert.alert('Error', 'Debes aceptar los términos y condiciones');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Publicar viaje
      const input = {
        origin: formData.origin,
        destination: formData.destination,
        date: formData.date,
        available_seats: parseInt(formData.available_seats),
        price: parseFloat(formData.price),
        vehicle_id: formData.vehicle_id,
        tagIds: formData.tagIds,
      };

      const res = await publishTrip(input);
      if (res) {
        Alert.alert('¡Éxito!', 'Tu viaje ha sido publicado correctamente');
        // Resetear formulario o navegar
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return (
          <Step3 
            formData={formData} 
            updateFormData={updateFormData}
            vehicles={vehicles}
            loadingVehicles={loadingVehicles}
          />
        );
      case 4:
        return (
          <Step4 
            formData={formData} 
            updateFormData={updateFormData}
            tags={tags}
            loadingTags={loadingTags}
          />
        );
      case 5:
        return (
          <Step5 
            formData={formData}
            setCurrentStep={setCurrentStep}
            vehicles={vehicles}
            tags={tags}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.background }} />
      
      <View style={styles.container}>
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          onBack={currentStep > 1 ? handleBack : undefined}
        />
        
        <View style={styles.stepContainer}>
          {renderStep()}
        </View>

        <View style={styles.bottomCTA}>
          <TouchableOpacity 
            style={[
              styles.nextButton,
              creating && styles.nextButtonDisabled
            ]} 
            onPress={handleNext}
            disabled={creating}
          >
            {creating ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.nextButtonText}>
                {currentStep === totalSteps ? 'Publicar Viaje' : 'Siguiente'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray800,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressInfo: {
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    color: colors.gray400,
  },
  progressRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: colors.gray800,
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  stepContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loadingText: {
    color: colors.gray400,
    marginTop: 12,
    fontSize: 16,
  },
  stepHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    color: colors.gray400,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray400,
    marginBottom: 12,
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.gray700,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.white,
  },
  textInputWithLeftIcon: {
    paddingLeft: 48,
  },
  textInputWithRightIcon: {
    paddingRight: 48,
  },
  multilineInput: {
    height: 96,
    textAlignVertical: 'top',
  },
  leftIconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -6 }],
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -8 }],
    zIndex: 1,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  mapPreview: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray700,
    marginBottom: 24,
  },
  mapText: {
    color: colors.gray400,
    fontSize: 14,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  infoText: {
    color: colors.gray400,
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  vehicleSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray400,
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  emptyText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  emptySubtext: {
    color: colors.gray400,
    fontSize: 14,
    marginTop: 4,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.gray700,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  vehicleCardSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleDetails: {
    marginLeft: 12,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  vehicleSpecs: {
    fontSize: 14,
    color: colors.gray400,
  },
  seatsSection: {
    marginBottom: 24,
  },
  seatsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  seatsButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginHorizontal: 24,
    minWidth: 48,
    textAlign: 'center',
  },
  seatsInfo: {
    alignItems: 'flex-end',
  },
  seatsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  seatsTotal: {
    fontSize: 12,
    color: colors.gray400,
  },
  priceSection: {
    marginBottom: 24,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.gray700,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  currencySymbol: {
    fontSize: 18,
    color: colors.gray400,
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
  },
  priceHint: {
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  priceHintText: {
    fontSize: 14,
    color: '#1e40af',
  },
  priceHintSubtext: {
    fontSize: 12,
    color: '#2563eb',
    marginTop: 4,
  },
  tagsSection: {
    marginBottom: 24,
  },
  tagsSubtitle: {
    fontSize: 14,
    color: colors.gray400,
    marginBottom: 12,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagCard: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.gray700,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tagCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagName: {
    fontSize: 14,
    color: colors.gray400,
    fontWeight: '500',
  },
  tagNameSelected: {
    color: colors.white,
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.gray700,
    borderRadius: 12,
    padding: 16,
  },
  reviewIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray800,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewSectionInfo: {
    flex: 1,
  },
  reviewSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  reviewSectionSubtitle: {
    fontSize: 14,
    color: colors.gray400,
    lineHeight: 20,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  beforePublishSection: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    marginTop: 8,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginLeft: 8,
  },
  warningList: {
    marginLeft: 28,
  },
  warningItem: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 6,
    lineHeight: 20,
  },
  termsSection: {
    marginBottom: 24,
  },
  termsCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gray400,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: colors.gray400,
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  bottomCTA: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray800,
    backgroundColor: colors.background,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: colors.gray700,
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
  },
});