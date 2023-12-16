import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export const PdfDocument = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  console.log("creando el component");

  return (
    <Document language="">
      <Page title="Cotización" size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Secion #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Secion #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Seccion #3</Text>
        </View>
      </Page>
    </Document>
  );
};
