import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

type CardProps = {
    title: string;
    info: string;
    items: { icon: string; label: string }[];
    price: string;
};

const Card: React.FC<CardProps> = ({ title, info, items, price }) => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Image 
                    style={styles.pfp} 
                    source={{ uri: 'https://www.shutterstock.com/image-vector/avatar-social-media-isolated-icon-260nw-1414687187.jpg' }} 
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.info}>{info}</Text>
                </View>
            </View>

            {/* Content Section */}
            <View style={styles.content}>
                {/* Bullet Point List */}
                <View style={styles.list}>
                    {items.map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <Text style={styles.icon}>{item.icon}</Text>
                            <Text style={styles.listText}>{item.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Price & Button (Aligned with Last Bullet Point) */}
                <View style={styles.priceSection}>
                    <Text style={styles.price}>{price}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Mas info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "85%",
        padding: 10,
        backgroundColor: "#222",
        borderRadius: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    textContainer: {
        marginLeft: 10,
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    info: {
        fontSize: 14,
        color: "#777",
    },
    pfp: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    list: {
        flex: 1, // Takes available space
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
    },
    icon: {
        color: "#ccc",
        fontSize: 18,
        marginRight: 8,
    },
    listText: {
        fontSize: 16,
        color: "#ccc",
    },
    priceSection: {
        alignItems: "center", // Centers price & button
        justifyContent: "center",
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 4, // Space between price and button
    },
    button: {
        backgroundColor: "#aaa",
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: "#ddd",
        fontSize: 14,
    },
});

export default Card;
