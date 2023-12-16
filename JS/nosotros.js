document.addEventListener('DOMContentLoaded', (event) => {
    window.addEventListener('scroll', () => {
      // Obtener la posición de scroll actual
      let scrollPosition = window.scrollY || document.documentElement.scrollTop;
      
      // Obtener la posición de la sección de opiniones
      let opinionSection = document.querySelector('.Opinion');
      let opinionPosition = opinionSection.getBoundingClientRect().top + window.scrollY;
      
      // Distancia antes de que la sección se vuelva visible
      let offset = 370; // Puedes ajustar este valor según necesites
  
      // Si hemos hecho scroll más allá de la altura de la sección de opiniones menos el offset
      if (scrollPosition > opinionPosition - offset) {
        opinionSection.classList.add('visible');
      }
    });
  });
  // Detecta cuando el contenido ha cargado
document.addEventListener('DOMContentLoaded', (event) => {
  // Añade el evento de scroll a la ventana
  window.addEventListener('scroll', () => {
    // Encuentra tu sección de clientes en el documento
    const clientesSection = document.querySelector('.Clientes');
    
    // Calcula la posición de la sección de clientes respecto al viewport
    const boundingClientRect = clientesSection.getBoundingClientRect();
    
    // Comprueba si la sección de clientes está visible
    if (boundingClientRect.top <= window.innerHeight) {
      // Añade la clase 'visible' para iniciar la animación
      clientesSection.classList.add('visible');
    }
  });
});



function changeText(circleId) {
  let text;
  switch(circleId) {
    case 'Contacto':
      text = 'Para conocer más sobre nosotros, contáctenos vía web, WhatsApp, email o teléfono.';
      break;
    case 'Asesoramos':
      text = 'Visitamos el sitio de la instalación ya sea en un domicilio particular o empresa';
      break;
    case 'Visita':
      text = 'Realizamos la instalación de nuestros servicios dentro del plazo establecido';
      break;
    case 'Instalación':
      text = 'Garantizamos la satisfacción del cliente, acompañándote en cada etapa del proceso.';
      break;
    case 'Satisfacción':
      text = 'Te asesoramos sin compromiso, adaptándonos a tus necesidades o las de tu empresa.';
      break;
    default:
      text = 'Conoce nuestra solución'; // Texto por defecto
  }
  document.getElementById('centralText').innerText = text;
}


var Stars = function(target, args) {
  if (args === undefined) args = {};
  var _scope = this;

  this.stars = [];
  this.vel = args.vel || 0.20;
  this.radius = args.radius || 1;
  this.alpha = 0.5;
  this.starsCounter = args.stars || 300;
  var center = {
      x: target.offsetWidth / 2,
      y: target.offsetHeight / 2
  };
  var canvas, context;
  
  this.init = function() {
      canvas = document.createElement("canvas");
      canvas.style.position = 'absolute'; // Asegúrate de que el canvas tenga posición absoluta
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '-1'; // Coloca el canvas detrás de otros elementos
      target.appendChild(canvas);
      context = canvas.getContext("2d");
      this.start();
      this.resize();
      
      window.addEventListener("resize", this.resize.bind(this));
  }


  this.start = function() {
      this.stars = [];
      for (var i = 0; i < this.starsCounter; i++) {
          setTimeout(function(){
              _scope.stars.push(new Star());
          }, i * 30);
      }
  }

  this.resize = function() {
      canvas.width = target.offsetWidth;
      canvas.height = target.offsetHeight;
      center.x = canvas.width / 2;
      center.y = canvas.height / 2;
  }

  this.animate = function() {
      window.requestAnimationFrame(this.animate.bind(this));
      this.render();
  }

  this.render = function() {
      context.fillStyle = 'rgba(1, 4, 35, 0.8)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = "white";
      for (var i = 0; i < this.stars.length; i++) {
          this.stars[i].update();
      }
  }

  var Star = function() {
      this.x = center.x;
      this.y = center.y;
      this.init = function() {
          this.radius = Math.random() * _scope.radius;
          this.x = center.x;
          this.y = center.y;
          this.lineWidth = 0;
          this.vel = {
              x: Math.random() * 10 - 5,
              y: Math.random() * 10 - 5
          }
      }
      this.update = function() {
          this.vel.x *= 1.002;
          this.vel.y *= 1.002;
          this.lineWidth += 0.020;
          this.x0 = this.x;
          this.y0 = this.y;
          this.x += this.vel.x;
          this.y += this.vel.y;
          this.draw();
          if (this.isDead()) this.init();
      }
      this.draw = function() {
          context.beginPath();
          context.moveTo(this.x0, this.y0);
          context.lineTo(this.x, this.y);
          context.lineWidth = this.lineWidth;
          context.stroke();
      }
      this.isDead = function() {
          return (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height);
      }
      this.init();
      return this;
  }

  this.init();
  this.animate();
  return this;
}

var starsEffect = new Stars(document.querySelector('.star-effect-container'));


