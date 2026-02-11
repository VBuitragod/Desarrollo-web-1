// JS/script.js

// 1. Selección de elementos (verificando que coincidan con los IDs del HTML)
const textInput = document.getElementById('textInput');
const displayArea = document.getElementById('displayArea');
const clearButton = document.getElementById('clearButton');
const body = document.body;

// Colores para el efecto de fondo durante la explosión
const explosionColors = ['#ffa285ff', '#ffa502', '#ff0026ff', '#ff9100ff'];
const originalBg = '#0f172a'; // Coincide con el CSS Dark Mode

// 2. Evento al escribir
textInput.addEventListener('input', (e) => {
    const valor = e.target.value;
    
    // Limpiamos y recreamos las letras como spans
    displayArea.innerHTML = '';
    valor.split('').forEach(letra => {
        const span = document.createElement('span');
        span.innerHTML = letra === ' ' ? '&nbsp;' : letra;
        displayArea.appendChild(span);
    });

    // Mostramos el botón si hay texto
    if (valor.length > 0) {
        clearButton.classList.add('visible');
    } else {
        clearButton.classList.remove('visible');
    }
});

// 3. Evento del botón (La explosión)
clearButton.addEventListener('click', () => {
    const spans = displayArea.querySelectorAll('span');
    if (spans.length === 0) return;

    // Cambiamos el fondo para dar impacto visual
    const colorAzar = explosionColors[Math.floor(Math.random() * explosionColors.length)];
    body.style.background = colorAzar;

    // Asignamos variables de movimiento aleatorio a cada letra
    spans.forEach((span) => {
        const moveX = (Math.random() - 0.5) * 800;
        const moveY = (Math.random() - 0.5) * 800;
        const rotate = (Math.random() - 0.5) * 1000;

        span.style.setProperty('--dx', `${moveX}px`);
        span.style.setProperty('--dy', `${moveY}px`);
        span.style.setProperty('--rot', `${rotate}deg`);
    });

    // Activamos la clase que dispara el CSS transition
    displayArea.classList.add('exploding-text', 'active');

    // Lanzamos partículas extra
    lanzarParticulas(colorAzar);

    // Reset general después de la animación
    setTimeout(() => {
        displayArea.classList.remove('active', 'exploding-text');
        displayArea.innerHTML = '';
        textInput.value = '';
        clearButton.classList.remove('visible');
        body.style.background = originalBg;
    }, 800);
});

// Función para crear partículas pequeñas volando
function lanzarParticulas(color) {
    for (let i = 0; i < 25; i++) { // Corregido: sin corchete extra
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.width = '8px';
        p.style.height = '8px'; // Corregido: línea completada
        p.style.backgroundColor = color;
        
        const px = (Math.random() - 0.5) * 1000;
        const py = (Math.random() - 0.5) * 1000;
        p.style.setProperty('--px', `${px}px`);
        p.style.setProperty('--py', `${py}px`);
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}