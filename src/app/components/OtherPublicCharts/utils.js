/* images */
import geomapimg from "app/assets/images/geomapimg.png";
import focuskeimg from "app/assets/images/geomapimg.png";
import focusnlimg from "app/assets/images/geomapimg.png";
import linechartimg from "app/assets/images/linechart.png";
import barchartimg from "app/assets/images/barchartimg.png";
import tablechartimg from "app/assets/images/tablechartimg.png";
import donutchartimg from "app/assets/images/donutchartimg.png";

// get other public chart image based on chart type
export function getPublicChartImage(type) {
  switch (type) {
    case "geomap":
      return geomapimg;
    case "focusKE":
      return focuskeimg;
    case "focusNL":
      return focusnlimg;
    case "linechart":
      return linechartimg;
    case "barchart":
      return barchartimg;
    case "tablechart":
      return tablechartimg;
    case "donutchart":
      return donutchartimg;
    default:
      return linechartimg;
  }
}
