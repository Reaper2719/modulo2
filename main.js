
function limpiarFormulario() {
    // Limpiar checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Limpiar radios
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    // Limpiar textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = '';
    });

    // Limpiar campos de texto
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.value = '';
        // Si el input está dentro de un label con checkbox/radio de "Otro"
        if (input.parentElement.querySelector('input[value="Otro"]')) {
            input.disabled = true;
        }
    });
}

// Activar campos de texto al marcar 'Otro'
// Configuración inicial y eventos
window.addEventListener('load', function() {
    // Deshabilitar todos los campos de texto "Otro" al inicio
    document.querySelectorAll('input[type="text"]').forEach(function(input) {
        if (input.parentElement.querySelector('input[value="Otro"]')) {
            input.disabled = true;
        }
    });

    // Configurar eventos para inputs de tipo "Otro"
    document.querySelectorAll('input[value="Otro"]').forEach(function(input) {
        input.addEventListener('change', function() {
            let textInput = this.parentElement.querySelector('input[type="text"]');
            if (textInput) {
                textInput.disabled = !this.checked;
                if (!this.checked) {
                    textInput.value = '';
                }
            }
        });
    });
});
