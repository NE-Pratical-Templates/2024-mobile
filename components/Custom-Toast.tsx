import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import AntDesign from "@expo/vector-icons/AntDesign";
export const CustomToast = ({
  message,
  id,
  type = "success",
}: {
  message: string | React.ReactNode; // Allow ReactNode in case of JSX
  id: string;
  type?: "success" | "danger" | "warning"; // Make type optional
}) => {
  const toast = useToast();
  let backgroundColor;
  let indicatorColor;

  switch (type) {
    case "success":
      indicatorColor = "darkgreen"; // Change this to the desired color
      break;
    case "danger":
      indicatorColor = "red"; // Change this to the desired color
      break;
    case "warning":
      indicatorColor = "orange"; // Change this to the desired color
      break;
    default:
      indicatorColor = "gray";
  }
  return (
    <View style={styles.toastContainer}>
      <View
        style={[styles.toastIndicator, { backgroundColor: indicatorColor }]}
      />
      {/* Wrap message inside Text if it's a string */}
      {typeof message === "string" ? (
        <Text className="font-lekton" style={styles.toastMessage}>
          {message}
        </Text>
      ) : (
        message // Render directly if message is JSX/ReactNode
      )}
      <TouchableOpacity
        onPress={() => toast.hide(id)}
        style={styles.toastCloseButton}
      >
        <AntDesign
          style={{ borderRadius: 50 }}
          name="closesquare"
          size={30}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  toastIndicator: {
    width: 8,
    height: "100%",
    borderTopLeftRadius: 10, // Match the parent's borderRadius
    borderBottomLeftRadius: 10, // Match
    marginRight: 10,
  },
  toastMessage: {
    flex: 1,
    fontSize: 20,
    color: "#000",
    padding: 15,
  },
  toastCloseButton: {
    padding: 5,
    borderRadius: 50,
  },
});
