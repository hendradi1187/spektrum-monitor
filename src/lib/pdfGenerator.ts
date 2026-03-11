import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

// Extend jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

// PDF Configuration Constants
export const PDF_CONFIG = {
  // Margins in mm (2.5cm = 25mm)
  margins: {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25,
  },

  // Page dimensions (A4)
  page: {
    width: 210, // A4 width in mm
    height: 297, // A4 height in mm
  },

  // Colors (matching design system)
  colors: {
    primary: [0, 82, 155], // #00529B
    secondary: [34, 34, 34], // #222222
    muted: [102, 102, 102], // #666666
    border: [220, 220, 220], // #DCDCDC
    success: [43, 122, 76], // #2B7A4C
    warning: [255, 193, 7], // #FFC107
    destructive: [220, 53, 69], // #DC3545
    watermark: [200, 200, 200], // Light gray for watermark
  },

  // Fonts
  fonts: {
    body: "helvetica", // Will use built-in Helvetica as fallback for Source Sans Pro
    display: "helvetica", // Will use built-in Helvetica as fallback for Inter
  },
} as const;

// Calculate content area
export const getContentArea = () => ({
  x: PDF_CONFIG.margins.left,
  y: PDF_CONFIG.margins.top,
  width: PDF_CONFIG.page.width - PDF_CONFIG.margins.left - PDF_CONFIG.margins.right,
  height: PDF_CONFIG.page.height - PDF_CONFIG.margins.top - PDF_CONFIG.margins.bottom,
});

// Initialize PDF with standard settings
export const initializePDF = (): jsPDF => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  return doc;
};

// Add header to PDF
export const addHeader = (
  doc: jsPDF,
  reportTitle: string,
  reportDate: Date = new Date()
) => {
  const { width } = PDF_CONFIG.page;
  const { top, left, right } = PDF_CONFIG.margins;

  // Logo placeholder (left side)
  doc.setFontSize(14);
  doc.setFont(PDF_CONFIG.fonts.display, "bold");
  doc.setTextColor(...PDF_CONFIG.colors.primary);
  doc.text("SPEKTRUM IOG 4.0", left, top - 10);

  // Report title (right side)
  doc.setFontSize(10);
  doc.setFont(PDF_CONFIG.fonts.body, "normal");
  doc.setTextColor(...PDF_CONFIG.colors.secondary);
  const titleWidth = doc.getTextWidth(reportTitle);
  doc.text(reportTitle, width - right - titleWidth, top - 10);

  // Divider line
  doc.setDrawColor(...PDF_CONFIG.colors.border);
  doc.setLineWidth(0.5);
  doc.line(left, top - 5, width - right, top - 5);
};

// Add footer to PDF
export const addFooter = (
  doc: jsPDF,
  pageNumber: number,
  totalPages: number,
  generatedDate: Date = new Date()
) => {
  const { width, height } = PDF_CONFIG.page;
  const { left, right, bottom } = PDF_CONFIG.margins;

  // Divider line
  doc.setDrawColor(...PDF_CONFIG.colors.border);
  doc.setLineWidth(0.5);
  doc.line(left, height - bottom + 5, width - right, height - bottom + 5);

  // Generated date (left side)
  doc.setFontSize(8);
  doc.setFont(PDF_CONFIG.fonts.body, "normal");
  doc.setTextColor(...PDF_CONFIG.colors.muted);
  const dateStr = `Generated: ${format(generatedDate, "dd MMM yyyy HH:mm")}`;
  doc.text(dateStr, left, height - bottom + 12);

  // Page number (right side)
  const pageStr = `Page ${pageNumber} of ${totalPages}`;
  const pageWidth = doc.getTextWidth(pageStr);
  doc.text(pageStr, width - right - pageWidth, height - bottom + 12);

  // Confidential text (center)
  doc.setTextColor(...PDF_CONFIG.colors.destructive);
  doc.setFont(PDF_CONFIG.fonts.body, "bold");
  const confText = "CONFIDENTIAL";
  const confWidth = doc.getTextWidth(confText);
  doc.text(confText, (width - confWidth) / 2, height - bottom + 12);
};

// Add watermark to PDF
export const addWatermark = (doc: jsPDF) => {
  const { width, height } = PDF_CONFIG.page;

  // Save current state
  const currentFont = doc.getFont();
  const currentFontSize = doc.getFontSize();

  // Configure watermark
  doc.setFontSize(60);
  doc.setFont(PDF_CONFIG.fonts.display, "bold");
  doc.setTextColor(...PDF_CONFIG.colors.watermark);

  // Calculate center position and rotation
  const text = "CONFIDENTIAL";
  const textWidth = doc.getTextWidth(text);
  const x = width / 2;
  const y = height / 2;

  // Rotate and draw watermark
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.1 }));

  // Translate to center, rotate, then draw
  const angle = -45;
  const radians = (angle * Math.PI) / 180;

  doc.text(text, x, y, {
    align: "center",
    angle: angle,
  });

  doc.restoreGraphicsState();

  // Restore previous state
  doc.setFont(currentFont.fontName, currentFont.fontStyle);
  doc.setFontSize(currentFontSize);
};

// Add section title
export const addSectionTitle = (
  doc: jsPDF,
  title: string,
  yPosition: number
): number => {
  doc.setFontSize(14);
  doc.setFont(PDF_CONFIG.fonts.display, "bold");
  doc.setTextColor(...PDF_CONFIG.colors.secondary);
  doc.text(title, PDF_CONFIG.margins.left, yPosition);

  // Add underline
  const titleWidth = doc.getTextWidth(title);
  doc.setDrawColor(...PDF_CONFIG.colors.primary);
  doc.setLineWidth(0.8);
  doc.line(
    PDF_CONFIG.margins.left,
    yPosition + 2,
    PDF_CONFIG.margins.left + titleWidth,
    yPosition + 2
  );

  return yPosition + 10; // Return new Y position after title
};

// Add paragraph text
export const addParagraph = (
  doc: jsPDF,
  text: string,
  yPosition: number,
  maxWidth?: number
): number => {
  const contentArea = getContentArea();
  const width = maxWidth || contentArea.width;

  doc.setFontSize(10);
  doc.setFont(PDF_CONFIG.fonts.body, "normal");
  doc.setTextColor(...PDF_CONFIG.colors.secondary);

  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, PDF_CONFIG.margins.left, yPosition);

  const lineHeight = 5;
  return yPosition + lines.length * lineHeight + 5;
};

// Add key-value pair
export const addKeyValue = (
  doc: jsPDF,
  key: string,
  value: string,
  yPosition: number
): number => {
  doc.setFontSize(10);

  // Key (bold)
  doc.setFont(PDF_CONFIG.fonts.body, "bold");
  doc.setTextColor(...PDF_CONFIG.colors.secondary);
  doc.text(key + ":", PDF_CONFIG.margins.left, yPosition);

  // Value (normal)
  doc.setFont(PDF_CONFIG.fonts.body, "normal");
  doc.setTextColor(...PDF_CONFIG.colors.muted);
  const keyWidth = doc.getTextWidth(key + ": ");
  doc.text(value, PDF_CONFIG.margins.left + keyWidth, yPosition);

  return yPosition + 6;
};

// Check if new page is needed
export const checkPageBreak = (doc: jsPDF, currentY: number, requiredSpace: number): number => {
  const contentArea = getContentArea();
  const maxY = PDF_CONFIG.page.height - PDF_CONFIG.margins.bottom - 15; // Reserve space for footer

  if (currentY + requiredSpace > maxY) {
    doc.addPage();
    addWatermark(doc);
    return PDF_CONFIG.margins.top; // Reset to top of new page
  }

  return currentY;
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return num.toLocaleString("id-ID");
};

// Format percentage
export const formatPercentage = (num: number): string => {
  return `${num.toFixed(1)}%`;
};
