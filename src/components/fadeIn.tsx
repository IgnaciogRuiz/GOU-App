import React, { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

type FadeInViewProps = ViewProps & {
    duration?: number;
};

export default function FadeInView({ children, duration = 1000, style, ...props }: FadeInViewProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[{ opacity: fadeAnim }, style]} {...props}>
            {children}
        </Animated.View>
    );
}
