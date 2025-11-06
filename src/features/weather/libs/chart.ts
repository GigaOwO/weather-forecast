import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

let registered = false;

/**
 * Chart.jsの拡張を一度だけ登録するユーティリティ
 */
export function ensureChartRegistration(): void {
  if (registered) {
    return;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  registered = true;
}
