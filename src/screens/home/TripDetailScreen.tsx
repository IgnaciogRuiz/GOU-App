import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Header Component
const TripDetailsHeader = ({ onBackPress }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Trip Details</Text>
  </View>
);

// Driver Info Component
const DriverInfo = ({ driver }) => (
  <View style={styles.driverSection}>
    <View style={styles.driverHeader}>
      <Image source={{ uri: driver.avatar }} style={styles.driverAvatar} />
      <View style={styles.driverDetails}>
        <Text style={styles.driverName}>{driver.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.ratingText}>{driver.rating} ({driver.reviews} reviews)</Text>
        </View>
        <Text style={styles.memberSince}>Member since {driver.memberSince}</Text>
      </View>
      <TouchableOpacity style={styles.messageButton}>
        <Ionicons name="chatbubble-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
    <View style={styles.driverInfo}>
      <View style={styles.infoItem}>
        <Ionicons name="car-outline" size={16} color="#9CA3AF" style={styles.infoIcon} />
        <Text style={styles.infoText}>{driver.car}</Text>
      </View>
      <View style={styles.infoItem}>
        <Ionicons name="musical-notes-outline" size={16} color="#9CA3AF" style={styles.infoIcon} />
        <Text style={styles.infoText}>Music OK</Text>
      </View>
    </View>
  </View>
);

// Route Component
const RouteSection = ({ route }) => (
  <View style={styles.routeSection}>
    <Text style={styles.sectionTitle}>Route</Text>
    <View style={styles.routeContainer}>
      <View style={styles.routeItem}>
        <View style={[styles.routeMarker, { backgroundColor: '#10B981' }]} />
        <View style={styles.routeDetails}>
          <Text style={styles.routeLocation}>{route.origin.name}</Text>
          <Text style={styles.routeTime}>Departure: {route.origin.time}</Text>
          <Text style={styles.routeAddress}>{route.origin.address}</Text>
        </View>
      </View>
      
      <View style={styles.routeConnector}>
        <View style={styles.connectorLine} />
        <Text style={styles.stopText}>Stop: {route.stop} (10 min)</Text>
      </View>
      
      <View style={styles.routeItem}>
        <View style={[styles.routeMarker, { backgroundColor: '#EF4444' }]} />
        <View style={styles.routeDetails}>
          <Text style={styles.routeLocation}>{route.destination.name}</Text>
          <Text style={styles.routeTime}>Arrival: {route.destination.time}</Text>
          <Text style={styles.routeAddress}>{route.destination.address}</Text>
        </View>
      </View>
    </View>
  </View>
);

// Passengers Component
const PassengersSection = ({ passengers, availableSeats, totalSeats }) => (
  <View style={styles.passengersSection}>
    <Text style={styles.sectionTitle}>
      Passengers ({passengers.length}/{totalSeats})
    </Text>
    <View style={styles.passengersList}>
      {passengers.map((passenger, index) => (
        <View key={index} style={styles.passengerItem}>
          <Image source={{ uri: passenger.avatar }} style={styles.passengerAvatar} />
          <View style={styles.passengerDetails}>
            <Text style={styles.passengerName}>{passenger.name}</Text>
            <Text style={styles.passengerRating}>⭐ {passenger.rating} · Verified</Text>
          </View>
          <Text style={styles.passengerSeats}>1 seat</Text>
        </View>
      ))}
      
      {/* Available seats */}
      {Array.from({ length: availableSeats }).map((_, index) => (
        <View key={`available-${index}`} style={[styles.passengerItem, styles.availableSeat]}>
          <View style={styles.availableAvatar}>
            <Ionicons name="add" size={16} color="#9CA3AF" />
          </View>
          <View style={styles.passengerDetails}>
            <Text style={styles.availableText}>Available seat</Text>
          </View>
          <Text style={styles.availableSeatsText}>1 seat</Text>
        </View>
      ))}
    </View>
  </View>
);

// Trip Info Component
const TripInfoSection = ({ duration, availableSeats, totalSeats, pricePerSeat }) => (
  <View style={styles.tripInfoSection}>
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name="time-outline" size={16} color="#9CA3AF" style={styles.infoIcon} />
        <Text style={styles.infoLabel}>Duration</Text>
      </View>
      <Text style={styles.infoValue}>{duration}</Text>
    </View>
    
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name="people-outline" size={16} color="#9CA3AF" style={styles.infoIcon} />
        <Text style={styles.infoLabel}>Available seats</Text>
      </View>
      <Text style={styles.infoValue}>{availableSeats} of {totalSeats}</Text>
    </View>
    
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name="card-outline" size={16} color="#9CA3AF" style={styles.infoIcon} />
        <Text style={styles.infoLabel}>Price per seat</Text>
      </View>
      <Text style={styles.priceValue}>€{pricePerSeat}</Text>
    </View>
  </View>
); 

// Bottom Navigation Component
/*const BottomNavigation = () => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="home-outline" size={24} color="#9CA3AF" />
      <Text style={styles.navLabel}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="search-outline" size={24} color="#2563EB" />
      <Text style={[styles.navLabel, styles.activeNavLabel]}>Search</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="add-outline" size={24} color="#9CA3AF" />
      <Text style={styles.navLabel}>Publish</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="chatbubble-outline" size={24} color="#9CA3AF" />
      <Text style={styles.navLabel}>Messages</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="person-outline" size={24} color="#9CA3AF" />
      <Text style={styles.navLabel}>Profile</Text>
    </TouchableOpacity>
  </View>
);*/


// Seat Selection Component
const SeatSelection = ({ seatCount, setSeatCount, maxSeats, pricePerSeat, serviceFee }) => {
  const subtotal = seatCount * pricePerSeat;
  const total = subtotal + serviceFee;

  const increaseSeat = () => {
    if (seatCount < maxSeats) {
      setSeatCount(seatCount + 1);
    }
  };

  const decreaseSeat = () => {
    if (seatCount > 1) {
      setSeatCount(seatCount - 1);
    }
  };

  return (
    <View style={styles.seatSelection}>
      <Text style={styles.sectionTitle}>Select seats</Text>
      <Text style={styles.seatQuestion}>How many seats do you need?</Text>
      
      <View style={styles.seatCounter}>
        <TouchableOpacity
          style={[styles.counterButton, seatCount <= 1 && styles.disabledButton]}
          onPress={decreaseSeat}
          disabled={seatCount <= 1}
        >
          <Ionicons name="remove" size={20} color="white" />
        </TouchableOpacity>
        
        <View style={styles.seatCountDisplay}>
          <Text style={styles.seatCountText}>{seatCount}</Text>
          <Text style={styles.seatCountLabel}>seat(s)</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.counterButton, seatCount >= maxSeats && styles.disabledButton]}
          onPress={increaseSeat}
          disabled={seatCount >= maxSeats}
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.priceBreakdown}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal</Text>
          <Text style={styles.priceText}>€{subtotal}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Service fee</Text>
          <Text style={styles.priceText}>€{serviceFee}</Text>
        </View>
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalText}>€{total}</Text>
        </View>
      </View>
    </View>
  );
};


// Main Component
const TripDetailsScreen = () => {
  const [seatCount, setSeatCount] = useState(1);

  // Mock data
  const driverData = {
    name: 'Carlos M.',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    rating: '4.8',
    reviews: '127',
    memberSince: '2019',
    car: 'BMW X3 Blue'
  };

  const routeData = {
    origin: {
      name: 'Barcelona Center',
      time: '08:30 AM',
      address: 'Plaça de Catalunya, 08002 Barcelona'
    },
    stop: 'Zaragoza',
    destination: {
      name: 'Madrid Center',
      time: '03:00 PM',
      address: 'Puerta del Sol, 28013 Madrid'
    }
  };

  const passengersData = [
    {
      name: 'Maria S.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      rating: '4.9'
    },
    {
      name: 'David R.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
      rating: '4.7'
    }
  ];

  const maxSeats = 2;
  const pricePerSeat = 25;
  const serviceFee = 2;

  const handleBackPress = () => {
    console.log('Back pressed');
  };

  const handleBookNow = () => {
    console.log('Book now pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TripDetailsHeader onBackPress={handleBackPress} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DriverInfo driver={driverData} />
        <RouteSection route={routeData} />
        <PassengersSection 
          passengers={passengersData} 
          availableSeats={maxSeats} 
          totalSeats={4} 
        />
        <TripInfoSection 
          duration="6h 30m"
          availableSeats={maxSeats}
          totalSeats={4}
          pricePerSeat={pricePerSeat}
        />
        <SeatSelection 
          seatCount={seatCount}
          setSeatCount={setSeatCount}
          maxSeats={maxSeats}
          pricePerSeat={pricePerSeat}
          serviceFee={serviceFee}
        />
        
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
        
        <Text style={styles.cancellationText}>
          Free cancellation up to 2 hours before departure
        </Text>
        
        {/* Add some bottom padding to account for navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/*<BottomNavigation />*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  
  // Driver Info Styles
  driverSection: {
    padding: 16,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#787D86',
  },
  memberSince: {
    fontSize: 14,
    color: '#787D86',
  },
  messageButton: {
    backgroundColor: '#374151',
    padding: 8,
    borderRadius: 8,
  },
  driverInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#787D86',
  },
  
  // Route Styles
  routeSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  routeContainer: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 4,
  },
  routeDetails: {
    flex: 1,
  },
  routeLocation: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  routeTime: {
    fontSize: 14,
    color: '#787D86',
    marginBottom: 2,
  },
  routeAddress: {
    fontSize: 12,
    color: '#6B7280',
  },
  routeConnector: {
    marginLeft: 6,
    marginVertical: 8,
  },
  connectorLine: {
    width: 1,
    height: 32,
    backgroundColor: '#4B5563',
    marginBottom: 8,
  },
  stopText: {
    fontSize: 14,
    color: '#787D86',
    marginLeft: 16,
  },
  
  // Passengers Styles
  passengersSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  passengersList: {
    gap: 12,
  },
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 2,
  },
  passengerRating: {
    fontSize: 14,
    color: '#787D86',
  },
  passengerSeats: {
    fontSize: 14,
    color: '#787D86',
  },
  availableSeat: {
    opacity: 0.5,
  },
  availableAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availableText: {
    fontSize: 16,
    color: '#787D86',
  },
  availableSeatsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // Trip Info Styles
  tripInfoSection: {
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: '#787D86',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  
  // Seat Selection Styles
  seatSelection: {
    padding: 16,
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  seatQuestion: {
    fontSize: 16,
    color: '#787D86',
    marginBottom: 16,
  },
  seatCounter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginBottom: 16,
  },
  counterButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#374151',
    borderWidth: 1,
    borderColor: '#4B5563',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  seatCountDisplay: {
    alignItems: 'center',
  },
  seatCountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  seatCountLabel: {
    fontSize: 14,
    color: '#787D86',
  },
  priceBreakdown: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#4B5563',
    paddingTop: 12,
    marginBottom: 0,
  },
  priceLabel: {
    fontSize: 16,
    color: '#787D86',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  
  // Book Button Styles
  bookButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  cancellationText: {
    fontSize: 12,
    color: '#787D86',
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 16,
  },
  
});

export default TripDetailsScreen;