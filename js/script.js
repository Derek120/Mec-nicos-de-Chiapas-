// Portal de Soporte Técnico - Taller Mecánico Chiapas
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formContacto');
  const mensajeExito = document.getElementById('mensajeExito');
  const descripcion = document.getElementById('descripcion');
  const contador = document.getElementById('contador');

  // Detección del evento input: contar caracteres de la descripción
  if (descripcion && contador) {
    descripcion.addEventListener('input', function () {
      const len = descripcion.value.length;
      contador.textContent = len;
      console.log('Evento input detectado. Caracteres:', len);
      if (len > 500) {
        descripcion.value = descripcion.value.substring(0, 500);
        contador.textContent = 500;
      }
    });
  }

  // Validación de correo electrónico
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Detección del evento submit
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Validación de campos obligatorios
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const desc = descripcion.value.trim();

      let valido = true;

      if (nombre.length < 3) { valido = false; }
      if (!validarEmail(email)) { valido = false; }
      if (!/^[0-9]{10}$/.test(telefono)) { valido = false; }
      if (desc.length < 10) { valido = false; }
      if (!document.getElementById('terminos').checked) { valido = false; }

      // Validación HTML5 + Bootstrap
      if (!form.checkValidity() || !valido) {
        form.classList.add('was-validated');
        return;
      }

      // Guardar información en localStorage
      const solicitud = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        descripcion: desc,
        vehiculo: document.getElementById('vehiculo').value.trim(),
        servicio: document.getElementById('servicio').value,
        fecha: new Date().toISOString()
      };
      localStorage.setItem('solicitudSoporte', JSON.stringify(solicitud));

      // Mostrar mensaje de confirmación
      form.classList.add('was-validated');
      mensajeExito.classList.remove('d-none');

      // Limpiar formulario
      form.reset();
      contador.textContent = '0';
      form.classList.remove('was-validated');

      // Ocultar mensaje después de 5 segundos
      setTimeout(function () {
        mensajeExito.classList.add('d-none');
      }, 5000);
    });
  }

  // Scroll suave para enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});