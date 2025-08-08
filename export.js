let registrosAcumulados = [];
let contadorRegistros = 0;

function actualizarContador() {
    const contadorElement = document.getElementById('contadorRegistros');
    if (contadorElement) {
        contadorElement.textContent = `Registros acumulados: ${contadorRegistros}`;
    }
}

function guardarRegistro(datos) {
    if (!Array.isArray(registrosAcumulados)) {
        registrosAcumulados = [];
    }
    registrosAcumulados.push(JSON.parse(datos));
    contadorRegistros = registrosAcumulados.length;
    actualizarContador();
    localStorage.setItem('registrosAcumulados', JSON.stringify(registrosAcumulados));
}

function exportarDatos() {
    const data = localStorage.getItem("respuestas_modulo2");
    if (!data) return alert("No hay datos guardados.");
    
    // Guardar el nuevo registro
    guardarRegistro(data);
    
    // Preparar todos los registros para exportar
    const todosLosRegistros = JSON.stringify(registrosAcumulados, null, 2);
    
    // Mostrar el área de exportación y actualizar el contenido
    const exportArea = document.getElementById('exportArea');
    const jsonExportText = document.getElementById('jsonExportText');
    
    exportArea.style.display = 'block';
    jsonExportText.value = todosLosRegistros;
    
    // Configurar el botón de copiar si aún no está configurado
    const btnCopiar = document.getElementById('btnCopiarJson');
    if (!btnCopiar.onclick) {
        btnCopiar.onclick = function() {
            jsonExportText.select();
            try {
                document.execCommand('copy');
                this.textContent = '¡Copiado!';
                setTimeout(() => { this.textContent = 'Copiar JSON'; }, 1500);
            } catch (e) {
                this.textContent = 'No se pudo copiar';
                setTimeout(() => { this.textContent = 'Copiar JSON'; }, 1500);
            }
        };
    }
    
    // Configurar el botón de descargar si aún no está configurado
    const btnDescargar = document.getElementById('btnDescargarJson');
    if (!btnDescargar.onclick) {
        btnDescargar.onclick = function() {
            const blob = new Blob([todosLosRegistros], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = url;
            enlaceDescarga.download = `registros_modulo2_${new Date().toISOString().slice(0,10)}.json`;
            enlaceDescarga.click();
            window.URL.revokeObjectURL(url);
        };
    }
}

// Esta función ya no se usa ya que ahora mostramos el textarea directamente en la página
function mostrarJsonEnModal(json) {
    // Función mantenida por compatibilidad pero ya no se utiliza
}





