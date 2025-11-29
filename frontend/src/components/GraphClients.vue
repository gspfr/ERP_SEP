<template>
  <div class="graph-container">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const props = defineProps({
  clients: {
    type: Array,
    required: true,
  },
});

const chart = ref(null);
let chartInstance = null;

// Fonction pour compter les statuts
function getStatusCounts() {
  const counts = { actif: 0, inactif: 0, prospect: 0 };
  props.clients.forEach((c) => {
    if (counts[c.statut] !== undefined) counts[c.statut]++;
  });
  return counts;
}

function renderChart() {
  const data = getStatusCounts();
  const labels = ["Actif", "Inactif", "Prospect"];
  const values = [data.actif, data.inactif, data.prospect];
  const colors = ["#4caf50", "#f44336", "#ffc107"];

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(chart.value, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
    plugins: [centerTextPlugin],
  });
}

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const {
      ctx,
      chartArea: { width, height },
    } = chart;
    ctx.save();
    ctx.font = "20px Poppins";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    ctx.fillText(total, width / 2, height / 2);
    ctx.restore();
  },
};

onMounted(() => {
  renderChart();
  Chart.register(centerTextPlugin);
});
watch(() => props.clients, renderChart, { deep: true });
</script>

<style scoped>
.graph-container {
  max-width: 200px;
  margin: 0 auto;
}
</style>
