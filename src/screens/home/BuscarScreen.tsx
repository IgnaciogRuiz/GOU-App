import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from '../../components';

const SearchScreen = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pasajeros, setPasajeros] = useState(1);
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
    setFecha(currentDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearch = () => {
    // Aquí iría la lógica de búsqueda
    console.log('Buscando viajes...', { origen, destino, fecha, pasajeros });
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#000000ff' }}>
      </SafeAreaView>
      
      <ScrollView style={styles.scrollView}>
        {/* Tarjeta de búsqueda */}
        <View style={styles.searchCard}>
          {/* Origen */}
          <View style={styles.inputSection}>
            <View style={styles.searchInputRow}>
              <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
              <TextInput
                style={styles.searchInput}
                placeholder="¿Desde dónde sales?"
                placeholderTextColor="#9ca3af"
                value={origen}
                onChangeText={setOrigen}
              />
            </View>
          </View>

          {/* Destino */}
          <View style={styles.inputSection}>
            <View style={styles.searchInputRow}>
              <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
              <TextInput
                style={styles.searchInput}
                placeholder="¿A dónde vas?"
                placeholderTextColor="#9ca3af"
                value={destino}
                onChangeText={setDestino}
              />
            </View>
          </View>

          {/* Fecha */}
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={styles.dateButtonContent}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.dateText}>
                {formatDate(fecha)}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          {/* Pasajeros */}
          <View style={styles.passengersSection}>
            <Text style={styles.sectionLabel}>Pasajeros</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={[styles.counterButton, pasajeros <= 1 && styles.counterButtonDisabled]}
                onPress={() => pasajeros > 1 && setPasajeros(pasajeros - 1)}
                disabled={pasajeros <= 1}
              >
                <Text style={[styles.counterButtonText, pasajeros <= 1 && styles.counterButtonTextDisabled]}>−</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>{pasajeros}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setPasajeros(pasajeros + 1)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Filtros adicionales */}
          <TouchableOpacity
            style={styles.filtersToggle}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={styles.filtersToggleText}>Filtros adicionales</Text>
            <Text style={[styles.chevron, showFilters && styles.chevronUp]}>
              {showFilters ? '︿' : '﹀'}
            </Text>
          </TouchableOpacity>

          {showFilters && (
            <View style={styles.filtersContainer}>
              <Text style={styles.sectionLabel}>Rango de precio por asiento</Text>
              <View style={styles.priceRangeContainer}>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.priceLabel}>Mín</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="€0"
                    placeholderTextColor="#9ca3af"
                    value={precioMin}
                    onChangeText={setPrecioMin}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.priceSeparator}>-</Text>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.priceLabel}>Máx</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="€100"
                    placeholderTextColor="#9ca3af"
                    value={precioMax}
                    onChangeText={setPrecioMax}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          )}

          {/* Botón de búsqueda */}
          <TouchableOpacity
            style={[styles.searchButton, (!origen || !destino) && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={!origen || !destino}
          >
            <Text style={styles.searchButtonText}>Buscar Viajes</Text>
          </TouchableOpacity>
        </View>

      
      </ScrollView>

      {/* DatePicker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="spinner"
          themeVariant="dark"
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000000',
  },
  searchCard: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginTop: 0,
    shadowColor: '#2563eb',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  inputSection: {
    marginBottom: 16,
  },
  searchInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Inter',
    paddingVertical: 4,
  },
  dateButton: {
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Inter',
  },
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
  passengersSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#e5e7eb',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    backgroundColor: '#374151',
  },
  counterButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterButtonTextDisabled: {
    color: '#6b7280',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e5e7eb',
    marginHorizontal: 16,
    fontFamily: 'Inter',
  },
  filtersToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    marginBottom: 16,
  },
  filtersToggleText: {
    fontSize: 14,
    color: '#9ca3af',
    fontFamily: 'Inter',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  priceInputContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  priceInput: {
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Inter',
  },
  priceSeparator: {
    fontSize: 16,
    color: '#9ca3af',
    marginHorizontal: 12,
    marginTop: 16,
  },
  searchButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonDisabled: {
    backgroundColor: '#374151',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  suggestionsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  suggestionItem: {
    backgroundColor: '#1a2535',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2d3748',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  suggestionIcon: {
    fontSize: 20,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionRoute: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  suggestionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Inter',
  },
  suggestionPrice: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  suggestionArrow: {
    marginLeft: 8,
  },
});

export default SearchScreen;