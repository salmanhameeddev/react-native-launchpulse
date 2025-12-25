import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    ArrowRight,
    Chrome,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Sparkles
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AuthPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Info', 'Google Sign-In is mocked for this demo.');
        }, 1500);
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (isLogin) {
                // Login success
                router.replace('/dashboard');
            } else {
                // Registration success -> Login
                Alert.alert('Success', 'Account created! Signing you in...', [
                    { text: 'OK', onPress: () => router.replace('/dashboard') }
                ]);
            }
        }, 1500);
    };

    return (
        <LinearGradient
            colors={['#f9fafb', '#eff6ff', '#faf5ff']} // gray-50, blue-50, purple-50
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {/* Decoration Circles */}
                        <LinearGradient
                            colors={['rgba(96, 165, 250, 0.3)', 'rgba(192, 132, 252, 0.3)']}
                            style={[styles.floatingCircle, { top: 40, left: -40 }]}
                        />
                        <LinearGradient
                            colors={['rgba(192, 132, 252, 0.3)', 'rgba(244, 114, 182, 0.3)']}
                            style={[styles.floatingCircle, { bottom: 40, right: -40 }]}
                        />

                        <View style={styles.contentContainer}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Sparkles color="#2563eb" size={32} />
                                <Text style={styles.brandName}>LaunchPulse</Text>
                            </View>

                            <Text style={styles.heading}>
                                Validate Your Ideas{'\n'}
                                <Text style={styles.headingGradient}>With AI Power</Text>
                            </Text>

                            {/* Form Container */}
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>
                                        {isLogin ? 'Welcome Back' : 'Get Started'}
                                    </Text>
                                    <Text style={styles.cardSubtitle}>
                                        {isLogin ? 'Sign in to your account' : 'Create your account'}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.googleButton}
                                    onPress={handleGoogleSignIn}
                                    disabled={loading}
                                >
                                    <Chrome color="#4b5563" size={20} />
                                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                                </TouchableOpacity>

                                <View style={styles.divider}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>Or continue with email</Text>
                                    <View style={styles.dividerLine} />
                                </View>

                                {/* Name Input (Sign Up Only) */}
                                {!isLogin && (
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Full Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="John Doe"
                                            value={name}
                                            onChangeText={setName}
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                )}

                                {/* Email Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email Address</Text>
                                    <View style={styles.inputWrapper}>
                                        <Mail size={20} color="#9ca3af" style={styles.inputIcon} />
                                        <TextInput
                                            style={[styles.input, { paddingLeft: 40 }]}
                                            placeholder="you@example.com"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.inputWrapper}>
                                        <Lock size={20} color="#9ca3af" style={styles.inputIcon} />
                                        <TextInput
                                            style={[styles.input, { paddingLeft: 40, paddingRight: 40 }]}
                                            placeholder="••••••••"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            placeholderTextColor="#9ca3af"
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            style={styles.eyeIcon}
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} color="#9ca3af" />
                                            ) : (
                                                <Eye size={20} color="#9ca3af" />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {isLogin && (
                                    <View style={styles.optionsRow}>
                                        <TouchableOpacity style={styles.checkboxContainer}>
                                            <View style={styles.checkbox} />
                                            <Text style={styles.rememberText}>Remember me</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={styles.forgotText}>Forgot password?</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={handleSubmit}
                                    disabled={loading}
                                >
                                    <Text style={styles.submitButtonText}>
                                        {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
                                    </Text>
                                    {!loading && <ArrowRight color="#fff" size={20} />}
                                </TouchableOpacity>

                                <View style={styles.switchRow}>
                                    <Text style={styles.switchText}>
                                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                                    </Text>
                                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                                        <Text style={styles.switchAction}>
                                            {isLogin ? 'Sign Up' : 'Sign In'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.termsText}>
                                    By continuing, you agree to our Terms of Service and Privacy Policy
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').height,
        padding: 20,
        justifyContent: 'center',
        marginBottom: 40, // some padding for safety
    },
    floatingCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        opacity: 0.6,
    },
    contentContainer: {
        width: '100%',
        maxWidth: 450,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        gap: 8,
    },
    brandName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 32,
        color: '#111827',
        lineHeight: 38,
    },
    headingGradient: {
        color: '#2563eb', // Fallback
        // In React Native, text gradient requires MaskedView, simplifying to solid color for stability
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    cardHeader: {
        marginBottom: 24,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    cardSubtitle: {
        color: '#4b5563',
        fontSize: 16,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 999,
        marginBottom: 24,
        gap: 8,
    },
    googleButtonText: {
        color: '#374151',
        fontWeight: '500',
        fontSize: 16,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#6b7280',
        fontSize: 14,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 999,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#111827',
    },
    inputIcon: {
        position: 'absolute',
        left: 14,
        zIndex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 14,
        zIndex: 1,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 4,
    },
    rememberText: {
        color: '#374151',
        fontSize: 14,
    },
    forgotText: {
        color: '#2563eb',
        fontWeight: '500',
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#111827',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 999,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    switchText: {
        color: '#4b5563',
        fontSize: 15,
    },
    switchAction: {
        color: '#2563eb',
        fontWeight: '600',
        fontSize: 15,
    },
    termsText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 12,
        marginTop: 20,
        lineHeight: 18,
    },
});
