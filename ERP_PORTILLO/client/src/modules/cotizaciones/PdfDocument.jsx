import {
  Document,
  Image,
  Page,
  Rect,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import createPdfFile from "./createPdfFile";
import { useEffect, useState } from "react";
import { FiArrowDownLeft } from "react-icons/fi";
import { TableRow } from "./components/TableRow";

export const PdfDocument = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "col",
      width: "100%",
      padding: 16,
    },
    header: {
      marginTop: 15,
      padding: 5,
      flexDirection: "row",
      fontWeight: "extrabold",
      justifyContent: "space-between",
    },
    sectionHeader: {
      marginTop: 8,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: "14px",
      width: "100%",
    },
    sectionProduct: {
      marginTop: 8,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: "14px",
      width: "100%",
    },
    sectionProducts: {
      marginTop: 8,
      flexDirection: "column",
    },
  });

  return (
    <Document language="">
      <Page title="Cotización" size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={{ textTransform: "uppercase", width: "100%" }}>
            <Text style={{ marginHorizontal: "auto" }}>cotización</Text>
            <Text style={{ marginHorizontal: "auto" }}>
              credito hipotecario
            </Text>
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: "60px" }}>Cliente:</Text>
              <Text>Maximo Rondom</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: "60px" }}>Asesor:</Text>
              <Text>Pierina Portillo</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Fecha de cotización:</Text>
            <Text style={{ marginLeft: "16px" }}>16/12/2023</Text>
          </View>
        </View>
        <View style={styles.sectionProducts}>
          <View style={styles.sectionProduct}>
            <View style={{ flexDirection: "column", gap: "4px" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: "120px" }}>Departamento:</Text>
                <Text>502</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: "120px" }}>Area (m2):</Text>
                <Text>100.00</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "180px",
              }}
            >
              <Text>Precio Dpto:</Text>
              <Text style={{ marginLeft: "16px" }}>$145,000.00</Text>
            </View>
          </View>
          <View style={styles.sectionProduct}>
            <View style={{ flexDirection: "column", gap: "4px" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: "120px" }}>Estacionamiento:</Text>
                <Text>Esta-semisotano 6</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: "120px" }}>Área (m2)</Text>
                <Text>12.25</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "180px",
              }}
            >
              <Text>Precio: Estac:</Text>
              <Text style={{ marginLeft: "16px" }}>$9800.00</Text>
            </View>
          </View>
          <View style={styles.sectionProduct}>
            <View style={{ flexDirection: "column", gap: "4px" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: "120px" }}>Deposito:</Text>
                <Text>Deposito 5</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: "120px" }}>Área (m2):</Text>
                <Text>2.8</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "180px",
              }}
            >
              <Text>Precio Deposito:</Text>
              <Text style={{ marginLeft: "16px" }}>$2,240.00</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: "16px",
              fontSize: 15,
            }}
          >
            <Text>Precio Total: Departamento + Cochera + Deposito</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>Oferta:</Text>
              <Text style={{ marginLeft: "16px" }}>$147,040.00</Text>
            </View>
          </View>
        </View>
        <View>
          <TableRow
            items={["Fecha", "N°", "Cuotas", "Monto"]}
            style={{ backgroundColor: "gray", fontSize: 14 }}
          />
          <TableRow
            items={["16-Dic-23", "Inicial", "40%", "$58,816.00"]}
            style={{ backgroundColor: "#e8e6fc", fontSize: 14 }}
          />
          <TableRow
            items={["16-Jun-24", "1ra Cuota", "50%", "$73,520.00"]}
            style={{ backgroundColor: "#e8e6fc", fontSize: 14 }}
          />
          <TableRow
            items={["-", "Obra Culminada", "10%", "$14,704.00"]}
            style={{ backgroundColor: "#e8e6fc", fontSize: 14 }}
          />
        </View>
      </Page>
    </Document>
  );
};
