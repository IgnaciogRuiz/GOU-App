import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

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

// Componente Header reutilizable
const StepHeader = ({ title, onBack, onSaveDraft }) => (
  <View style={styles.header}>
    {onBack ? (
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="arrow-left" size={16} color="#9ca3af" />
      </TouchableOpacity>
    ) : (
      <View style={{ width: 40 }} /> 
    )}
    <Text style={styles.headerTitle}>{title}</Text>
    {onSaveDraft && (
      <TouchableOpacity onPress={onSaveDraft}>
        <Text style={styles.saveDraft}></Text>
      </TouchableOpacity>
    )}
  </View>
);
// Componente Progress Bar
const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const progressWidth = `${percentage}%`;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Paso {currentStep} de {totalSteps}</Text>
        <Text style={styles.progressPercentage}>{percentage}%</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={styles.progressBarFill} />
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
const Step1 = ({ formData, updateFormData, onNext }) => {
  const recentLocations = [
    { name: 'Downtown Plaza', address: '123 Main Street' },
    { name: 'Airport Terminal', address: '456 Airport Blvd' },
  ];

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>¿Cuál es tu próximo destino?</Text>
        <Text style={styles.stepSubtitle}>Empecemos con tu ruta de viaje.</Text>
      </View>

      <InputWithIcon
        label="Origen"
        placeholder="Ingrese el lugar de busqueda"
        value={formData.origin}
        onChangeText={(text) => updateFormData('origin', text)}
        leftIcon={<View style={[styles.locationDot, { backgroundColor: colors.primary }]} />}
        rightIcon={<Icon name="location-crosshairs" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Location', 'Getting current location...')}
      />

      <InputWithIcon
        label="Destino"
        placeholder="Enter destination"
        value={formData.destination}
        onChangeText={(text) => updateFormData('destination', text)}
        leftIcon={<View style={[styles.locationDot, { backgroundColor: colors.red500 }]} />}
        rightIcon={<Icon name="map" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Map', 'Opening map...')}
      />

      {/* Map Preview */}
      <View style={styles.mapPreview}>
        <Icon name="map" size={32} color="#4b5563" />
        <Text style={styles.mapText}>La ruta aparecera aquí</Text>
      </View>

      {/* Recent Locations */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Destinos recientes</Text>
        {recentLocations.map((location, index) => (
          <TouchableOpacity key={index} style={styles.recentItem}>
            <Icon name="clock-rotate-left" size={16} color="#6b7280" style={styles.recentIcon} />
            <View>
              <Text style={styles.recentName}>{location.name}</Text>
              <Text style={styles.recentAddress}>{location.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};


/*------------------------------------------------------------
---------------STEP 2: FECHA Y HORA DE SALIDA-----------------
------------------------------------------------------------*/
const Step2 = ({ formData, updateFormData, onNext }) => {
  const quickTimes = [
    { label: 'Morning', time: '08:00' },
    { label: 'Afternoon', time: '14:00' },
    { label: 'Evening', time: '18:00' },
  ];

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>¿Cuál es tu horario de salida?</Text>
        <Text style={styles.stepSubtitle}>Elige una fecha y un horario de salidas</Text>
      </View>

      <InputWithIcon
        label="Fecha"
        placeholder="Selecciona una fecha"
        value={formData.date}
        onChangeText={(text) => updateFormData('date', text)}
        leftIcon={null}
        rightIcon={<Icon name="calendar-days" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Calendar', 'Open date picker')}
      />

      <InputWithIcon
        label="Hora"
        placeholder="Selecciona una hora"
        value={formData.time}
        onChangeText={(text) => updateFormData('time', text)}
        leftIcon={null}
        rightIcon={<Icon name="clock" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Clock', 'Open time picker')}
      />

      {/* Quick Time Options */}
      <View style={styles.quickTimeSection}>
        <Text style={styles.sectionTitle}>Seccion rapida</Text>
        <View style={styles.quickTimeGrid}>
          {quickTimes.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.quickTimeButton}
              onPress={() => updateFormData('time', item.time)}
            >
              <Text style={styles.quickTimeLabel}>{item.label}</Text>
              <Text style={styles.quickTimeValue}>{item.time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Estimated Arrival */}
      <View style={styles.arrivalCard}>
        <View>
          <Text style={styles.arrivalTitle}>Llegada estimada</Text>
          <Text style={styles.arrivalSubtitle}>Basado en un promedio</Text>
        </View>
        <Text style={styles.arrivalTime}>16:30</Text>
      </View>
    </ScrollView>
  );
};


/*------------------------------------------------------------
----------------STEP 3: VEHICULOS Y ASIENTOS------------------
------------------------------------------------------------*/
const Step3 = ({ formData, updateFormData, onNext }) => {
  const vehicles = [
    { id: 1, name: 'Honda Civic 2020', details: 'Blue • ABC-123', selected: true },
    { id: 2, name: 'Toyota Camry 2019', details: 'White • XYZ-789', selected: false },
  ];

  const vehicleFeatures = [
    { 
      id: 'airConditioning', 
      name: 'Aire Acondicionado', 
      icon: 'snowflake', 
      color: colors.primary,
      selected: formData.features?.airConditioning || false 
    },
    { 
      id: 'musicSystem', 
      name: 'Musica', 
      icon: 'music', 
      color: '#8b5cf6',
      selected: formData.features?.musicSystem || false 
    },
    { 
      id: 'luggageSpace', 
      name: 'Baul', 
      icon: 'briefcase', 
      color: '#f59e0b',
      selected: formData.features?.luggageSpace || false 
    },
    { 
      id: 'smoking', 
      name: 'Fumar', 
      icon: 'smoking', 
      color: colors.accent,
      selected: formData.features?.phoneCharger || false 
    },
  ];

  const adjustSeats = (increment) => {
    const currentSeats = formData.seats || 3;
    const newSeats = Math.max(1, Math.min(4, currentSeats + increment));
    updateFormData('seats', newSeats);
  };

  const toggleFeature = (featureId) => {
    const currentFeatures = formData.features || {};
    const updatedFeatures = {
      ...currentFeatures,
      [featureId]: !currentFeatures[featureId]
    };
    updateFormData('features', updatedFeatures);
  };

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Tu vehiculo</Text>
        <Text style={styles.stepSubtitle}>Selecciona tu auto y los asientos disponibles</Text>
      </View>

      {/* Vehicle Selection */}
      <View style={styles.vehicleSection}>
        <Text style={styles.sectionTitle}>Selecciona vehiculo</Text>
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleCard,
              vehicle.selected && styles.vehicleCardSelected
            ]}
            onPress={() => updateFormData('vehicleId', vehicle.id)}
          >
            <View style={styles.vehicleInfo}>
              <Icon
                name="car"
                size={24}
                color={vehicle.selected ? colors.primary : '#6b7280'}
              />
              <View style={styles.vehicleDetails}>
                <Text style={styles.vehicleName}>{vehicle.name}</Text>
                <Text style={styles.vehicleSpecs}>{vehicle.details}</Text>
              </View>
            </View>
            <Icon
              name={vehicle.selected ? "check-circle" : "circle"}
              size={20}
              color={vehicle.selected ? colors.primary : '#d1d5db'}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Vehicle Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Características del vehículo</Text>
        <View style={styles.featuresGrid}>
          {vehicleFeatures.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[
                styles.featureCard,
                feature.selected && styles.featureCardSelected
              ]}
              onPress={() => toggleFeature(feature.id)}
            >
              <View style={[
                styles.featureIconContainer,
                { backgroundColor: feature.selected ? feature.color + '15' : colors.gray800 }
              ]}>
                <Icon
                  name={feature.icon}
                  size={20}
                  color={feature.selected ? feature.color : colors.gray400}
                />
              </View>
              <Text style={[
                styles.featureName,
                { color: feature.selected ? colors.white : colors.gray400 }
              ]}>
                {feature.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Seats Selection */}
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
            <Text style={styles.seatsNumber}>{formData.seats || 3}</Text>
            <TouchableOpacity
              style={styles.seatButton}
              onPress={() => adjustSeats(1)}
            >
              <Icon name="plus" size={16} color="#4b5563" />
            </TouchableOpacity>
          </View>
          <View style={styles.seatsInfo}>
            <Text style={styles.seatsLabel}>Asientos</Text>
            <Text style={styles.seatsTotal}>de un total de 4</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


/*------------------------------------------------------------
----------------STEP 4: PRECIOS Y NOTAS------------------
------------------------------------------------------------*/

const Step4 = ({ formData, updateFormData, onNext }) => (
  <ScrollView style={styles.content}>
    <View style={styles.stepHeader}>
      <Text style={styles.stepTitle}>Precios y Aclaraciones</Text>
      <Text style={styles.stepSubtitle}>Pon un precio y aclara tus condiciones</Text>
    </View>

    <View style={styles.priceSection}>
      <Text style={styles.sectionTitle}>Precio por asiento</Text>
      <View style={styles.priceInputContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.priceInput}
          value={formData.price?.toString() || '25'}
          onChangeText={(text) => updateFormData('price', parseInt(text) || 0)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.priceHint}>
        <Text style={styles.priceHintText}>💡 Precio sugerido: $22.000-28.000 por asiento</Text>
        <Text style={styles.priceHintSubtext}>Basado en costos de gasolina y peajes</Text>
      </View>
    </View>

    <InputWithIcon
      label="Aclaraciones del viaje (Opcional)"
      placeholder="Agregue cualquier detalle importante para los pasajeros..."
      value={formData.notes}
      onChangeText={(text) => updateFormData('notes', text)}
      leftIcon={null}
      rightIcon={null}
      onRightIconPress={() => {}}
      multiline={true}
    />
  </ScrollView>
);

/*------------------------------------------------------------
----------------STEP 5: REVISAR Y CONFIRMAR------------------
------------------------------------------------------------*/
const Step5 = ({ formData, updateFormData, onNext, setCurrentStep, acceptTerms, setAcceptTerms }) => {

  // Función para obtener el nombre del vehículo seleccionado
  const getSelectedVehicle = () => {
    const vehicles = [
      { id: 1, name: 'Honda Civic 2020', details: 'Blue • ABC-123' },
      { id: 2, name: 'Toyota Camry 2019', details: 'White • XYZ-789' },
    ];
    return vehicles.find(v => v.id === formData.vehicleId) || vehicles[0];
  };

  // Función para obtener características seleccionadas
  const getSelectedFeatures = () => {
    const features = formData.features || {};
    const selectedFeatures = [];
    
    if (features.airConditioning) selectedFeatures.push('Aire Acondicionado');
    if (features.musicSystem) selectedFeatures.push('Música');
    if (features.luggageSpace) selectedFeatures.push('Baúl');
    if (features.smoking) selectedFeatures.push('Fumar');
    
    return selectedFeatures;
  };

  const selectedVehicle = getSelectedVehicle();
  const selectedFeatures = getSelectedFeatures();

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Revisar y Confirmar</Text>
        <Text style={styles.stepSubtitle}>Revisa los detalles de tu viaje antes de publicar</Text>
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
              {formData.origin || 'Downtown Plaza'} → {formData.destination || 'Airport Terminal'}
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

      {/* Fecha y Hora */}
      <View style={styles.reviewSection}>
        <View style={styles.reviewSectionHeader}>
          <View style={styles.reviewIconContainer}>
            <Icon name="calendar-days" size={20} color={colors.primary} />
          </View>
          <View style={styles.reviewSectionInfo}>
            <Text style={styles.reviewSectionTitle}>Fecha y Hora</Text>
            <Text style={styles.reviewSectionSubtitle}>
              {formData.date || 'Mañana, Dic 15'} • {formData.time || '2:30 PM'}
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
      <View style={styles.reviewSection}>
        <View style={styles.reviewSectionHeader}>
          <View style={styles.reviewIconContainer}>
            <Icon name="car" size={20} color={colors.gray400} />
          </View>
          <View style={styles.reviewSectionInfo}>
            <Text style={styles.reviewSectionTitle}>{selectedVehicle.name}</Text>
            <Text style={styles.reviewSectionSubtitle}>{selectedVehicle.details}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setCurrentStep(3)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Asientos */}
      <View style={styles.reviewSection}>
        <View style={styles.reviewSectionHeader}>
          <View style={styles.reviewIconContainer}>
            <Icon name="users" size={20} color={colors.gray400} />
          </View>
          <View style={styles.reviewSectionInfo}>
            <Text style={styles.reviewSectionTitle}>Asientos</Text>
            <Text style={styles.reviewSectionSubtitle}>
              {formData.seats || 3} asientos disponibles • Total ganancias: ${((formData.price || 25) * (formData.seats || 3)).toLocaleString()}
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

      {/* Precio */}
      <View style={styles.reviewSection}>
        <View style={styles.reviewSectionHeader}>
          <View style={styles.reviewIconContainer}>
            <Icon name="dollar-sign" size={20} color={colors.accent} />
          </View>
          <View style={styles.reviewSectionInfo}>
            <Text style={styles.reviewSectionTitle}>${(formData.price || 25).toLocaleString()} por asiento</Text>
            <Text style={styles.reviewSectionSubtitle}>Ganancias promedio: ${((formData.price || 25) * 0.85).toFixed(0)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setCurrentStep(4)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notas del Viaje */}
      {formData.notes && (
        <View style={styles.reviewSection}>
          <View style={styles.reviewSectionHeader}>
            <View style={styles.reviewIconContainer}>
              <Icon name="note-sticky" size={20} color={colors.gray400} />
            </View>
            <View style={styles.reviewSectionInfo}>
              <Text style={styles.reviewSectionTitle}>Notas del Viaje</Text>
              <Text style={styles.reviewSectionSubtitle} numberOfLines={2}>
                {formData.notes}
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

      {/* Características del Vehículo */}
      {selectedFeatures.length > 0 && (
        <View style={styles.reviewSection}>
          <View style={styles.reviewSectionHeader}>
            <View style={styles.reviewIconContainer}>
              <Icon name="star" size={20} color={colors.primary} />
            </View>
            <View style={styles.reviewSectionInfo}>
              <Text style={styles.reviewSectionTitle}>Características</Text>
              <Text style={styles.reviewSectionSubtitle}>
                {selectedFeatures.join(' • ')}
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

      {/* Vista Previa del Viaje */}
      <View style={styles.tripPreviewSection}>
        <Text style={styles.sectionTitle}>Vista Previa de tu Viaje</Text>
        <Text style={styles.stepSubtitle}>Así verán los pasajeros tu viaje</Text>
        
        <View style={styles.tripPreviewCard}>
          <View style={styles.tripPreviewHeader}>
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverInitial}>J</Text>
              </View>
              <View>
                <Text style={styles.driverName}>John D.</Text>
                <Text style={styles.driverRating}>⭐ 4.8 (42 trips)</Text>
              </View>
            </View>
            <View style={styles.priceDisplay}>
              <Text style={styles.priceAmount}>${formData.price || 25}</Text>
              <Text style={styles.priceLabel}>por asiento</Text>
            </View>
          </View>
          
          <View style={styles.tripDetails}>
            <View style={styles.tripDetailItem}>
              <Icon name="clock" size={16} color={colors.gray400} />
              <Text style={styles.tripDetailText}>
                {formData.date || 'Mañana'} {formData.time || '2:30 PM'}
              </Text>
            </View>
            <View style={styles.tripDetailItem}>
              <Icon name="users" size={16} color={colors.gray400} />
              <Text style={styles.tripDetailText}>{formData.seats || 3} asientos disponibles</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Antes de Publicar */}
      <View style={styles.beforePublishSection}>
        <View style={styles.warningContainer}>
          <Icon name="triangle-exclamation" size={20} color="#f59e0b" />
          <Text style={styles.warningTitle}>Antes de publicar</Text>
        </View>
        
        <View style={styles.warningList}>
          <Text style={styles.warningItem}>• Asegúrate de que tu vehículo esté limpio y funcional</Text>
          <Text style={styles.warningItem}>• Llega al punto de encuentro puntualmente</Text>
          <Text style={styles.warningItem}>• Mantén una comunicación clara con los pasajeros</Text>
          <Text style={styles.warningItem}>• Respeta las reglas de tránsito y conduce con seguridad</Text>
          <Text style={styles.warningSubtext}>
            Recuerda: No podrás cancelar tu viaje hasta 2 horas antes del tiempo de salida.
          </Text>
        </View>
      </View>

      {/* Términos y Condiciones */}
      <View style={styles.termsSection}>
        <TouchableOpacity 
          style={styles.termsCheckbox}
          onPress={() => setAcceptTerms(!acceptTerms)}
        >
          <View style={[styles.checkbox, acceptTerms && styles.checkboxSelected]}>
            {acceptTerms && <Icon name="check" size={14} color={colors.white} />}
          </View>
          <Text style={styles.termsText}>
            Acepto los <Text style={styles.termsLink}>Términos de Servicio</Text> y{' '}
            <Text style={styles.termsLink}>Condiciones de la Comunidad</Text>.{' '}
            Confirmo que toda la información del viaje es precisa.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Componente principal
const PublishTripScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false); // Agregar este estado
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    vehicleId: 1,
    seats: 3,
    price: 25,
    notes: '',
    features: {
      airConditioning: false,
      musicSystem: false,
      luggageSpace: false,
      smoking: false,
    },
  });

  const totalSteps = 5; // Actualizar a 5 pasos

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    // Validar términos y condiciones en el último paso
    if (currentStep === totalSteps && !acceptTerms) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones para continuar');
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Publicar viaje
      Alert.alert('¡Éxito!', 'Tu viaje ha sido publicado exitosamente');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    Alert.alert('Borrador', 'Viaje guardado como borrador');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 4:
        return <Step4 formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 5:
        return (
          <Step5 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext}
            setCurrentStep={setCurrentStep}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
          />
        );
      default:
        return null;
    }
  };

  // El resto del componente permanece igual...
  return (
    <SafeAreaView style={styles.container}>
      <StepHeader 
        title="Publicar viaje" 
        onBack={currentStep > 1 ? handleBack : undefined} 
        onSaveDraft={handleSaveDraft}
      />
      
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <View style={styles.stepContainer}>
        {renderStep()}
      </View>

      <View style={styles.bottomCTA}>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            currentStep === totalSteps && !acceptTerms && styles.nextButtonDisabled
          ]} 
          onPress={handleNext}
          disabled={currentStep === totalSteps && !acceptTerms}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Publicar Viaje' : 'Siguiente'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray800,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: -40, 
  },
  saveDraft: {
    fontSize: 14,
    color: colors.gray400,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: colors.gray400,
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
  stepHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
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
  recentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray400,
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  recentIcon: {
    marginRight: 12,
  },
  recentName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  recentAddress: {
    fontSize: 12,
    color: colors.gray400,
  },
  quickTimeSection: {
    marginBottom: 24,
  },
  quickTimeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickTimeButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.gray700,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  quickTimeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  quickTimeValue: {
    fontSize: 12,
    color: colors.gray400,
    marginTop: 2,
  },
  arrivalCard: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.gray700,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  arrivalTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  arrivalSubtitle: {
    fontSize: 12,
    color: colors.gray400,
  },
  arrivalTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  vehicleSection: {
    marginBottom: 24,
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
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
  },
  seatsButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatButton: {
    width: 40,
    height: 40,
    color: colors.white,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffffff',
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
    color: '#ffffffff',
  },
  seatsTotal: {
    fontSize: 12,
    color: '#6b7280',
  },
  seatVisual: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  seatVisualTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  seatLayout: {
    alignItems: 'center',
    marginBottom: 16,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 32,
  },
  seatRowBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  seat: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatDriver: {
    backgroundColor: colors.gray800,
  },
  seatAvailable: {
    backgroundColor: colors.accent,
  },
  seatReserved: {
    backgroundColor: '#e5e7eb',
  },
  seatLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
    // Sección de características
  featuresSection: {
    marginBottom: 24,
  },
  
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  
  featureCard: {
    width: '48%',
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  
  featureCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.gray700,
  },
  
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  featureName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
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
    color: '#6b7280',
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
  bottomCTA: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray800,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
   nextButtonDisabled: {
    backgroundColor: colors.gray700,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
  },

  // Sección de revisión
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

  // Vista previa del viaje
  tripPreviewSection: {
    marginTop: 24,
    marginBottom: 24,
  },

  tripPreviewCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
  },

  tripPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  driverInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },

  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 2,
  },

  driverRating: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  priceDisplay: {
    alignItems: 'flex-end',
  },

  priceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },

  priceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tripDetailText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 8,
  },

  // Sección "Antes de Publicar"
  beforePublishSection: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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

  warningSubtext: {
    fontSize: 13,
    color: '#d97706',
    marginTop: 8,
    fontStyle: 'italic',
    lineHeight: 18,
  },

  // Términos y condiciones
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
});

export default PublishTripScreen;