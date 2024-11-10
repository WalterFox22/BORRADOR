document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    const resultContainer = document.getElementById('result');
    const urlInput = document.getElementById('qrInput'); // Campo de entrada para el texto del QR

    // Función para generar un ID único
    function generateUniqueId() {
        return Math.random().toString(36).substring(2, 9); // ID aleatorio
    }

    // Agrega un evento click al botón de generar QR
    generateButton.addEventListener('click', async () => {
        const data = urlInput.value;
        const fmt = 'png'; // Formato de imagen QR
        const apiKey = 'UGUGF1MuBMBvdZHxoEMM1A==fFqB68iPsbrGS1Mx'; // Tu clave API

        const uniqueId = generateUniqueId(); // Genera un ID único para el QR
        const apiUrl = `https://api.api-ninjas.com/v1/qrcode?data=${encodeURIComponent(data + "?id=" + uniqueId)}&format=${fmt}`;

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'X-Api-Key': apiKey,
                    'Accept': 'image/png'
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const imgUrl = URL.createObjectURL(blob);
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = "Código QR";

                // Limpia el contenedor y muestra el QR
                resultContainer.innerHTML = '';
                resultContainer.appendChild(img);

                // Almacena el ID único generado para su validación posterior
                localStorage.setItem('qrUniqueId', uniqueId);
            } else {
                const errorText = await response.text();
                console.error("Error:", response.status, errorText);
                alert('Ocurrió un error al generar el código QR.');
            }
        } catch (error) {
            console.error("Request error:", error);
            alert('Ocurrió un error al generar el código QR.');
        }
    });
});
