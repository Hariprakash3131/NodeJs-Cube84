import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement
);

export function getChartThemeColors() {
  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.8)';
  
  // Extract CSS primary variable
  const rawPrimary = getComputedStyle(document.documentElement).getPropertyValue('--primary-500').trim();
  const primaryRgb = rawPrimary ? rawPrimary.replace(/\s+/g, ', ') : '99, 102, 241';

  return { isDark, textColor, gridColor, primaryRgb };
}

export const ChartsManager = {
  instances: {},

  initDashboardCharts() {
    this.initRevenueChart();
    this.initTrafficDonutChart();
    this.initFunnelChart();

    window.addEventListener('servora:theme-changed', () => this.updateAllThemes());
    window.addEventListener('servora:color-changed', () => this.updateAllThemes());
  },

  initRevenueChart(canvasId = 'revenueChart') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { textColor, gridColor, primaryRgb } = getChartThemeColors();
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, `rgba(${primaryRgb}, 0.35)`);
    gradient.addColorStop(1, `rgba(${primaryRgb}, 0.0)`);

    const gradientSecondary = ctx.createLinearGradient(0, 0, 0, 300);
    gradientSecondary.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    gradientSecondary.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    if (this.instances[canvasId]) this.instances[canvasId].destroy();

    this.instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue ($k)',
            data: [45, 52, 60, 58, 72, 85, 94, 91, 108, 120, 135, 150],
            borderColor: `rgb(${primaryRgb})`,
            backgroundColor: gradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
          },
          {
            label: 'Expenses ($k)',
            data: [25, 28, 30, 32, 38, 42, 45, 43, 50, 55, 60, 64],
            borderColor: 'rgb(6, 182, 212)',
            backgroundColor: gradientSecondary,
            borderWidth: 2,
            borderDash: [5, 5],
            fill: true,
            tension: 0.4,
            pointRadius: 2,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, font: { family: 'Inter', size: 12 } }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            padding: 12,
            cornerRadius: 8,
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor, font: { size: 11 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              callback: (val) => '$' + val + 'k',
              font: { size: 11 }
            }
          }
        }
      }
    });
  },

  initTrafficDonutChart(canvasId = 'trafficDonutChart') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { textColor, primaryRgb } = getChartThemeColors();
    if (this.instances[canvasId]) this.instances[canvasId].destroy();

    this.instances[canvasId] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Organic Search', 'Direct Referral', 'Social Channels', 'Email Campaigns'],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: [
            `rgb(${primaryRgb})`,
            '#06b6d4',
            '#10b981',
            '#f59e0b'
          ],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor, padding: 14, font: { family: 'Inter', size: 12 } }
          }
        }
      }
    });
  },

  initFunnelChart(canvasId = 'funnelChart') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { textColor, gridColor, primaryRgb } = getChartThemeColors();
    if (this.instances[canvasId]) this.instances[canvasId].destroy();

    this.instances[canvasId] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Website Visitors', 'Form Inquiries', 'Qualified Leads', 'Proposals Sent', 'Deals Won'],
        datasets: [{
          label: 'Conversions',
          data: [12400, 3120, 1450, 720, 480],
          backgroundColor: [
            `rgba(${primaryRgb}, 0.9)`,
            `rgba(${primaryRgb}, 0.75)`,
            `rgba(${primaryRgb}, 0.6)`,
            `rgba(${primaryRgb}, 0.45)`,
            '#10b981'
          ],
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor }
          },
          y: {
            grid: { display: false },
            ticks: { color: textColor }
          }
        }
      }
    });
  },

  updateAllThemes() {
    this.initRevenueChart();
    this.initTrafficDonutChart();
    this.initFunnelChart();
  }
};

if (typeof window !== 'undefined') {
  window.ChartsManager = ChartsManager;
}

