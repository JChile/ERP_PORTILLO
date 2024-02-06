import { StandardFonts, rgb, PDFDocument } from "pdf-lib";

const createPdfFile = async () => {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;
  page.drawText("Creando una cotizacion", {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  return pdfDataUri
};


export default createPdfFile