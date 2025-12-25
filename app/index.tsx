import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

export default function Index() {
    const router = useRouter();
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.5);

    useEffect(() => {
        // Pulse animation for scale
        scale.value = withRepeat(
            withSequence(
                withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        // Fade animation for glow effect
        opacity.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        // Simulate loading and navigate
        const timer = setTimeout(() => {
            router.replace('/auth');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <View style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient
                colors={['#ffffff', '#f0f9ff', '#eef2ff']}
                style={StyleSheet.absoluteFill}
            />

            <Animated.View style={[styles.content, animatedIconStyle]}>
                <View style={styles.iconContainer}>
                    <LinearGradient
                        colors={['#2563eb', '#7c3aed']}
                        style={styles.iconBackground}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Sparkles size={48} color="#ffffff" strokeWidth={2} />
                    </LinearGradient>
                </View>

                <Text style={styles.title}>
                    LaunchPulse
                </Text>
                <Text style={styles.subtitle}>
                    Validating Ideas with AI
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 24,
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    iconBackground: {
        width: 80,
        height: 80,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1e293b',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
});
