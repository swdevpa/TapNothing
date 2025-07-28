import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { ThemeMode, THEMES } from '../constants/themes';

interface ThemeSelectorProps {
  visible: boolean;
  currentTheme: ThemeMode;
  onClose: () => void;
  onSelectTheme: (theme: ThemeMode) => void;
  isDarkMode: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  visible,
  currentTheme,
  onClose,
  onSelectTheme,
  isDarkMode,
}) => {
  const modalBackgroundColor = isDarkMode ? '#1A1A1A' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#333333';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: modalBackgroundColor }]}>
          <Text style={[styles.modalTitle, { color: textColor }]}>
            Choose Your Mood
          </Text>
          
          <ScrollView style={styles.themeList}>
            {(Object.keys(THEMES) as ThemeMode[]).map((themeKey) => {
              const theme = THEMES[themeKey];
              const isSelected = currentTheme === themeKey;
              
              return (
                <TouchableOpacity
                  key={themeKey}
                  style={[
                    styles.themeOption,
                    { backgroundColor: theme.colors[0] },
                    isSelected && styles.selectedTheme,
                  ]}
                  onPress={() => {
                    onSelectTheme(themeKey);
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.themeOptionText,
                    { color: theme.isDark ? '#FFFFFF' : '#333333' }
                  ]}>
                    {theme.name}
                  </Text>
                  {isSelected && (
                    <Text style={[
                      styles.selectedIndicator,
                      { color: theme.isDark ? '#FFFFFF' : '#333333' }
                    ]}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: isDarkMode ? '#333' : '#DDD' }]}
            onPress={onClose}
          >
            <Text style={[styles.closeButtonText, { color: textColor }]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  themeList: {
    maxHeight: 300,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  selectedTheme: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  themeOptionText: {
    fontSize: 18,
    fontWeight: '600',
  },
  selectedIndicator: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});