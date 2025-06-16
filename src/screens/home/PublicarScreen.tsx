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
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Icon name="arrow-left" size={16} color="#9ca3af" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <TouchableOpacity onPress={onSaveDraft}>
      <Text style={styles.saveDraft}>Save Draft</Text>
    </TouchableOpacity>
  </View>
);

// Componente Progress Bar
const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const progressWidth = `${percentage}%`;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
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

// Step 1: Origin & Destination
const Step1 = ({ formData, updateFormData, onNext }) => {
  const recentLocations = [
    { name: 'Downtown Plaza', address: '123 Main Street' },
    { name: 'Airport Terminal', address: '456 Airport Blvd' },
  ];

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Where are you going?</Text>
        <Text style={styles.stepSubtitle}>Let's start with your trip route</Text>
      </View>

      <InputWithIcon
        label="From"
        placeholder="Enter pickup location"
        value={formData.origin}
        onChangeText={(text) => updateFormData('origin', text)}
        leftIcon={<View style={[styles.locationDot, { backgroundColor: colors.primary }]} />}
        rightIcon={<Icon name="location-crosshairs" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Location', 'Getting current location...')}
      />

      <InputWithIcon
        label="To"
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
        <Text style={styles.mapText}>Route will appear here</Text>
      </View>

      {/* Recent Locations */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent locations</Text>
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

// Step 2: Date & Time
const Step2 = ({ formData, updateFormData, onNext }) => {
  const quickTimes = [
    { label: 'Morning', time: '08:00' },
    { label: 'Afternoon', time: '14:00' },
    { label: 'Evening', time: '18:00' },
  ];

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>When do you depart?</Text>
        <Text style={styles.stepSubtitle}>Choose your departure date and time</Text>
      </View>

      <InputWithIcon
        label="Departure Date"
        placeholder="Select date"
        value={formData.date}
        onChangeText={(text) => updateFormData('date', text)}
        leftIcon={null}
        rightIcon={<Icon name="calendar-days" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Calendar', 'Open date picker')}
      />

      <InputWithIcon
        label="Departure Time"
        placeholder="Select time"
        value={formData.time}
        onChangeText={(text) => updateFormData('time', text)}
        leftIcon={null}
        rightIcon={<Icon name="clock" size={16} color={colors.primary} />}
        onRightIconPress={() => Alert.alert('Clock', 'Open time picker')}
      />

      {/* Quick Time Options */}
      <View style={styles.quickTimeSection}>
        <Text style={styles.sectionTitle}>Quick select</Text>
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
          <Text style={styles.arrivalTitle}>Estimated arrival</Text>
          <Text style={styles.arrivalSubtitle}>Based on typical traffic</Text>
        </View>
        <Text style={styles.arrivalTime}>16:30</Text>
      </View>
    </ScrollView>
  );
};

// Step 3: Vehicle & Seats
const Step3 = ({ formData, updateFormData, onNext }) => {
  const vehicles = [
    { id: 1, name: 'Honda Civic 2020', details: 'Blue • ABC-123', selected: true },
    { id: 2, name: 'Toyota Camry 2019', details: 'White • XYZ-789', selected: false },
  ];

  const adjustSeats = (increment) => {
    const currentSeats = formData.seats || 3;
    const newSeats = Math.max(1, Math.min(4, currentSeats + increment));
    updateFormData('seats', newSeats);
  };

  return (
    <ScrollView style={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Your vehicle</Text>
        <Text style={styles.stepSubtitle}>Select your car and available seats</Text>
      </View>

      {/* Vehicle Selection */}
      <View style={styles.vehicleSection}>
        <Text style={styles.sectionTitle}>Choose Vehicle</Text>
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

      {/* Seats Selection */}
      <View style={styles.seatsSection}>
        <Text style={styles.sectionTitle}>Available Seats</Text>
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
            <Text style={styles.seatsLabel}>seats</Text>
            <Text style={styles.seatsTotal}>out of 4 total</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

// Step 4: Price & Notes
const Step4 = ({ formData, updateFormData, onNext }) => (
  <ScrollView style={styles.content}>
    <View style={styles.stepHeader}>
      <Text style={styles.stepTitle}>Price & Details</Text>
      <Text style={styles.stepSubtitle}>Set your price and add trip notes</Text>
    </View>

    <View style={styles.priceSection}>
      <Text style={styles.sectionTitle}>Price per seat</Text>
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
        <Text style={styles.priceHintText}>💡 Suggested price: $22-28 per seat</Text>
        <Text style={styles.priceHintSubtext}>Based on distance and fuel costs</Text>
      </View>
    </View>

    <InputWithIcon
      label="Trip Notes (Optional)"
      placeholder="Add any important details for passengers..."
      value={formData.notes}
      onChangeText={(text) => updateFormData('notes', text)}
      leftIcon={null}
      rightIcon={null}
      onRightIconPress={() => {}}
      multiline={true}
    />
  </ScrollView>
);

// Componente principal
const PublishTripScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    vehicleId: 1,
    seats: 3,
    price: 25,
    notes: '',
  });

  const totalSteps = 4;

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Publicar viaje
      Alert.alert('Success', 'Trip published successfully!');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft', 'Trip saved as draft');
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
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <StepHeader 
        title="Publish a Trip" 
        onBack={handleBack}
        onSaveDraft={handleSaveDraft}
      />
      
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <View style={styles.stepContainer}>
        {renderStep()}
      </View>

      <View style={styles.bottomCTA}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Publish Trip' : 'Next'}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray800,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
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
    backgroundColor: '#f9fafb',
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
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
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
    color: '#111827',
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
  nextButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
  },
});

export default PublishTripScreen;