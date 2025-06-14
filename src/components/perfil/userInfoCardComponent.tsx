import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';


interface UserStats {
  trips: number;
  published: number;
  recorrido: string;
}

interface UserInfo {
  name: string;
  memberSince: string;
  rating: number;
  totalTrips: number;
  avatar: string;
  stats: UserStats;
}

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Icon
        key={i}
        name="star"
        size={12}
        color="#FFC107"
        solid
        style={styles.star}
      />
    );
  }
  return <View style={styles.starsContainer}>{stars}</View>;
};

// User Info Component
const UserInfoCard: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <View style={styles.userInfoCard}>
      <View style={styles.userInfoHeader}>
        <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.memberSince}>Miembro desde {userInfo.memberSince}</Text>
          <View style={styles.ratingContainer}>
            <StarRating rating={userInfo.rating} />
            <Text style={styles.ratingText}>
              {userInfo.rating} ({userInfo.totalTrips} Viajes)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userInfo.stats.trips}</Text>
          <Text style={styles.statLabel}>Viajes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userInfo.stats.published}</Text>
          <Text style={styles.statLabel}>Publicados</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userInfo.stats.recorrido}</Text>
          <Text style={styles.statLabel}>Recorrido</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 userInfoCard: {
    backgroundColor: '#111827',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 24,
  },
  userInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#787D86',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    fontSize: 14,
    color: '#787D86',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#787D86',
  },
    starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    marginRight: 2,
  },
});

export default UserInfoCard;
