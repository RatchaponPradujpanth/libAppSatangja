import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment"; // ใช้ moment.js เพื่อจัดการวันที่

const BorrowEquipmentCard = ({ equipmentData, onBorrowPress, isBorrowed }) => {
  const { name, description, available_quantity, total_quantity } = equipmentData;
  const isAvailable = available_quantity > 0;

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.mainInfo}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description} numberOfLines={2}>{description}</Text>
            <Text style={styles.status}>
              สถานะ: <Text style={[styles.statusText, { 
                color: isBorrowed ? '#ffc107' : isAvailable ? '#28a745' : '#dc3545' 
              }]}>
                {isBorrowed ? 'รอรับอุปกรณ์' : isAvailable ? 'พร้อมให้ยืม' : 'ไม่พร้อมให้ยืม'}
              </Text>
            </Text>
            <Text style={styles.available}>จำนวนที่พร้อมให้ยืม: {available_quantity}/{total_quantity}</Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.borrowButton,
              { 
                backgroundColor: isBorrowed ? '#dc3545' : 
                  isAvailable ? '#122620' : '#B68D40'
              }
            ]}
            onPress={onBorrowPress}
          >
            <Text style={styles.borrowButtonText}>
              {isBorrowed ? 'ยกเลิก' : isAvailable ? 'ยืม' : 'จอง'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    marginBottom: 2,
  },
  statusText: {
    fontWeight: "bold",
  },
  available: {
    fontSize: 12,
    color: "#666",
  },
  borrowButton: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: 'center',
    minWidth: 70,
  },
  borrowButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BorrowEquipmentCard;
