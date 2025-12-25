import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet, View } from 'react-native';

export default function DashboardScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Dashboard</ThemedText>
            <View style={styles.content}>
                <ThemedText>Welcome to your LaunchPulse Dashboard.</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: 20,
    },
});
