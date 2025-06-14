import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Componente de input de búsqueda
const SearchInput = ({ placeholder, value, onChangeText, dotColor = '#2563eb' }) => (
  <View style={styles.searchInputRow}>
    <View style={[styles.dot, { backgroundColor: dotColor }]} />
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#6b7280"
    />
  </View>
);

// Componente de botón con icono
const IconButton = ({ icon, onPress, style, iconColor = '#6b7280' }) => (
  <Pressable style={[styles.iconButton, style]} onPress={onPress}>
    <Icon name={icon} size={16} color={iconColor} />
  </Pressable>
);

// Componente de filtros de fecha
const DateFilters = () => (
  <View style={styles.dateFilters}>
    <Pressable style={styles.dateButton}>
      <View style={styles.dateButtonContent}>
        <Icon name="calendar" size={14} color="#9ca3af" style={styles.dateIcon} />
        <Text style={styles.dateText}>Today</Text>
      </View>
      <Icon name="chevron-down" size={12} color="#9ca3af" />
    </Pressable>
    <IconButton icon="sliders" style={styles.filterButton} onPress={() => {}} />
  </View>
);

// Componente de información del viaje (tiempo)
const TripTimeInfo = ({ startTime, endTime, duration }) => (
  <View style={styles.tripTimeContainer}>
    <View style={styles.timeInfo}>
      <Icon name="clock-o" size={14} color="#9ca3af" />
      <Text style={styles.timeText}>{startTime}</Text>
    </View>
    <View style={styles.durationLine}>
      <View style={styles.durationBorder} />
      <View style={styles.durationLabel}>
        <Text style={styles.durationText}>{duration}</Text>
      </View>
    </View>
    <View style={styles.timeInfo}>
      <Icon name="clock-o" size={14} color="#9ca3af" />
      <Text style={styles.timeText}>{endTime}</Text>
    </View>
  </View>
);

// Componente de tarjeta de viaje
const TripCard = ({ trip, onViewDetails }) => (
  <View style={styles.tripCard}>
    <View style={styles.tripHeader}>
      <View style={styles.driverInfo}>
        <Image source={{ uri: trip.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.driverName}>{trip.driverName}</Text>
          <Text style={styles.driverRating}>
            {trip.rating} ⭐ ({trip.trips} trips)
          </Text>
        </View>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.price}>€{trip.price}</Text>
        <Text style={styles.priceLabel}>per seat</Text>
      </View>
    </View>

    <TripTimeInfo
      startTime={trip.startTime}
      endTime={trip.endTime}
      duration={trip.duration}
    />

    <View style={styles.tripFooter}>
      <View style={styles.seatsInfo}>
        <Icon name="users" size={14} color="#9ca3af" />
        <Text style={styles.seatsText}>{trip.seatsLeft} seats left</Text>
      </View>
      <Pressable style={styles.viewDetailsButton} onPress={() => onViewDetails(trip)}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </Pressable>
    </View>
  </View>
);

// Componente principal
const BuscarScreen = () => {
  const [fromLocation, setFromLocation] = useState('Barcelona');
  const [toLocation, setToLocation] = useState('Madrid');

  const trips = [
    {
      id: 1,
      driverName: 'Carlos M.',
      rating: 4.8,
      trips: 127,
      price: 25,
      startTime: '08:30',
      endTime: '15:00',
      duration: '6h 30m',
      seatsLeft: 3,
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    },
    {
      id: 2,
      driverName: 'Maria L.',
      rating: 4.9,
      trips: 89,
      price: 22,
      startTime: '10:15',
      endTime: '16:30',
      duration: '6h 15m',
      seatsLeft: 1,
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
    },
  ];

  const handleViewDetails = (trip) => {
    console.log('View details for trip:', trip.id);
  };

  const handleGoBack = () => {
    console.log('Go back');
  };

  const handleSort = () => {
    console.log('Sort trips');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          {/* Search Section */}
          <View style={styles.searchSection}>
            <SearchInput
              placeholder="From: Barcelona"
              value={fromLocation}
              onChangeText={setFromLocation}
              dotColor="#2563eb"
            />
            <SearchInput
              placeholder="To: Madrid"
              value={toLocation}
              onChangeText={setToLocation}
              dotColor="#ef4444"
            />
          </View>

          <DateFilters />

          {/* Results Header */}
          <View style={styles.resultsHeader}>
            <IconButton icon="arrow-left" onPress={handleGoBack} style={{}} />
            <View style={styles.resultsInfo}>
              <Text style={styles.resultsTitle}>Available Trips</Text>
              <Text style={styles.resultsCount}>{trips.length} trips found</Text>
            </View>
            <IconButton 
              icon="sort" 
              onPress={handleSort} 
              style={styles.sortButton}
            />
          </View>
        </View>

        {/* Trip Results */}
        <View style={styles.tripResults}>
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onViewDetails={handleViewDetails}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchSection: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  searchInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter',
  },
  dateFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Inter',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter',
  },
  sortButton: {
    backgroundColor: '#f3f4f6',
  },
  tripResults: {
    padding: 16,
    gap: 12,
  },
  tripCard: {
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    fontFamily: 'Inter',
  },
  driverRating: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'Inter',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter',
  },
  tripTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#374151',
    fontFamily: 'Inter',
  },
  durationLine: {
    flex: 1,
    marginHorizontal: 16,
    position: 'relative',
  },
  durationBorder: {
    height: 1,
    backgroundColor: '#9CA3AF',
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  durationLabel: {
    position: 'absolute',
    top: -8,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
  },
  durationText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter',
  },
  tripFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seatsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatsText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  viewDetailsButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewDetailsText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});

export default BuscarScreen;