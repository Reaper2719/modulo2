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
    
    // Mostrar los datos en el textarea
    let exportArea = document.getElementById('exportArea');
    if (!exportArea) {
        exportArea = document.createElement('div');
        exportArea.id = 'exportArea';
        exportArea.style.margin = '20px 0';
        exportArea.innerHTML = `
            <h3>Datos Exportados</h3>
            <textarea id="jsonExportText" style="width:100%;height:200px;margin:10px 0;">${todosLosRegistros}</textarea>
            <button id="btnCopiarJson" style="margin-right:10px;">Copiar JSON</button>
            <button id="btnDescargarJson">Descargar JSON</button>
        `;
        document.querySelector('.acciones').appendChild(exportArea);
        
        // Agregar funcionalidad al botón de copiar
        document.getElementById('btnCopiarJson').onclick = function() {
            const textarea = document.getElementById('jsonExportText');
            textarea.select();
            try {
                document.execCommand('copy');
                this.textContent = '¡Copiado!';
                setTimeout(() => { this.textContent = 'Copiar JSON'; }, 1500);
            } catch (e) {
                this.textContent = 'No se pudo copiar';
                setTimeout(() => { this.textContent = 'Copiar JSON'; }, 1500);
            }
        };
        
        // Agregar funcionalidad al botón de descargar
        document.getElementById('btnDescargarJson').onclick = function() {
            const blob = new Blob([todosLosRegistros], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = url;
            enlaceDescarga.download = `registros_modulo2_${new Date().toISOString().slice(0,10)}.json`;
            enlaceDescarga.click();
            window.URL.revokeObjectURL(url);
        };
    } else {
        document.getElementById('jsonExportText').value = todosLosRegistros;
    }
}

// Esta función ya no se usa ya que ahora mostramos el textarea directamente en la página
function mostrarJsonEnModal(json) {
    // Función mantenida por compatibilidad pero ya no se utiliza
}





