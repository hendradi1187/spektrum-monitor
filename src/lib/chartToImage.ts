import html2canvas from "html2canvas";

export interface ChartImageOptions {
  scale?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

/**
 * Convert a DOM element (typically a chart) to a base64 image
 * @param element - DOM element to convert
 * @param options - Conversion options
 * @returns Promise<string> - Base64 encoded image
 */
export const convertElementToImage = async (
  element: HTMLElement,
  options: ChartImageOptions = {}
): Promise<string> => {
  const {
    scale = 2, // Higher scale for better quality
    backgroundColor = "#ffffff",
    width,
    height,
  } = options;

  try {
    const canvas = await html2canvas(element, {
      scale,
      backgroundColor,
      width,
      height,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error converting element to image:", error);
    throw new Error("Failed to convert chart to image");
  }
};

/**
 * Convert a Recharts chart to image
 * @param chartId - ID of the chart container element
 * @param options - Conversion options
 * @returns Promise<string> - Base64 encoded image
 */
export const convertChartToImage = async (
  chartId: string,
  options: ChartImageOptions = {}
): Promise<string> => {
  const element = document.getElementById(chartId);

  if (!element) {
    throw new Error(`Chart element with ID "${chartId}" not found`);
  }

  // Find the SVG element inside (Recharts renders SVG)
  const svgElement = element.querySelector("svg");

  if (svgElement) {
    // Use the SVG parent container for better quality
    return convertElementToImage(element, options);
  }

  // Fallback to element itself
  return convertElementToImage(element, options);
};

/**
 * Batch convert multiple charts to images
 * @param chartIds - Array of chart container IDs
 * @param options - Conversion options
 * @returns Promise<Record<string, string>> - Map of chartId to base64 image
 */
export const convertMultipleCharts = async (
  chartIds: string[],
  options: ChartImageOptions = {}
): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};

  for (const chartId of chartIds) {
    try {
      const image = await convertChartToImage(chartId, options);
      results[chartId] = image;
    } catch (error) {
      console.error(`Failed to convert chart ${chartId}:`, error);
      // Continue with other charts
    }
  }

  return results;
};

/**
 * Wait for charts to fully render before capturing
 * @param delay - Delay in milliseconds (default: 500ms)
 */
export const waitForChartsToRender = (delay: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Prepare chart element for PDF capture
 * Ensures chart is visible and properly sized
 * @param chartId - ID of chart container
 */
export const prepareChartForCapture = (chartId: string): void => {
  const element = document.getElementById(chartId);

  if (!element) {
    console.warn(`Chart element ${chartId} not found`);
    return;
  }

  // Ensure element is visible
  const originalDisplay = element.style.display;
  if (originalDisplay === "none") {
    element.style.display = "block";
  }

  // Force reflow to ensure rendering is complete
  void element.offsetHeight;
};

/**
 * Restore chart element after capture
 * @param chartId - ID of chart container
 * @param originalDisplay - Original display style
 */
export const restoreChartAfterCapture = (
  chartId: string,
  originalDisplay: string
): void => {
  const element = document.getElementById(chartId);

  if (!element) {
    return;
  }

  element.style.display = originalDisplay;
};
