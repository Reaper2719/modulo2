function exportarDatos() {
  const data = localStorage.getItem("respuestas_modulo1");
  if (!data) return alert("No hay datos guardados.");
  // Mostrar el JSON en el textarea
  const container = document.getElementById('jsonContainer');
  const textarea = document.getElementById('jsonTextarea');
  if (container && textarea) {
    textarea.value = data;
    container.style.display = 'block';
  }
  // Intentar descargar el archivo JSON
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "respuestas_modulo1.json";
  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
  setTimeout(() => {
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
      window.open(url, '_blank');
    }
  }, 200);
}

function copiarJSON() {
  const textarea = document.getElementById('jsonTextarea');
  if (textarea) {
    textarea.select();
    document.execCommand('copy');
    alert('JSON copiado al portapapeles');
  }
}
