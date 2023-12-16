const slideData = [
    { title: "Acabados de Pintura", description: "Transforma tus espacios con acabados de pintura de alta calidad que añaden elegancia y estilo a tu hogar u oficina." },
    { title: "Servicios de Electricidad", description: "Confía en nuestros expertos para solucionar tus necesidades eléctricas con seguridad y eficiencia, garantizando un suministro confiable." },
    { title: "Servicios de Construcción", description: "Realizamos proyectos de construcción innovadores y personalizados que superan tus expectativas y cumplen con los más altos estándares." },
    { title: "Instalación de Drywall", description: "Optimiza tus espacios con instalaciones de drywall precisas y estéticas que se adaptan a tus necesidades." },
    { title: "Instalación de Aire Acondicionado", description: "Disfruta de un ambiente confortable todo el año con nuestros servicios de instalación y mantenimiento de aire acondicionado." },
    { title: "Instalación de Paneles Solares", description: "Contribuye al medio ambiente y ahorra en energía con la instalación de paneles solares eficientes y ecológicos." },
    { title: "Servicio de Mudanza", description: "Simplifica tu mudanza con nuestro servicio profesional, cuidando de tus pertenencias como si fueran nuestras." },
    { title: "Instalación de Cámaras de Vigilancia", description: "Protege lo que más importa con nuestras soluciones de seguridad, brindando tranquilidad y control total." },
    { title: "Elaboración de Estructuras Metálicas", description: "Creamos estructuras metálicas sólidas y duraderas que cumplen con tus requisitos y especificaciones." },


    // Añade más objetos para cada imagen en el swiper
];
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
