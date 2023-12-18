import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

export const TableRow = ({ items, style }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 15,
    },
    column: {
      borderWidth: 1,
      borderColor: "black",
      paddingVertical: 8,
      paddingHorizontal: 8,
      flex: 1,
      flexWrap: "wrap",
      ...style,
    },
  });

  return (
    <View style={styles.row}>
      {items.map((value, index) => (
        <View style={styles.column} key={index}>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  );
};
