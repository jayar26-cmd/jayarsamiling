$(document).ready(function() {
    
    // Initial layer animation
    $(".layer1").animate({
        opacity: 0.8
    }, 2000, "linear");

    // Fade out last name on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {$("#will-disappear").fadeOut();
            $("#first-name").css("font-size", "4.5rem");
        } else {
            $("#will-disappear").fadeIn();
            $("#first-name").css("font-size", "");
        }
    });

    // Mobile navigation toggle logic
    var menuOpen = false;
    $("#menu-icon").click(function() {
        if (!menuOpen) {
            menuOpen = true;
            $("#menu-icon-img").removeClass("menu-icon-img-class").addClass("menu-icon-img-cls");
            $("#menu-close-icon").removeClass("menu-close-icon-disabled").addClass("menu-close-icon-active");
            $("#sub-menu-id").removeClass("sub-menu").addClass("sub-menu-active");
        } else {
            menuOpen = false;
            $("#menu-icon-img").removeClass("menu-icon-img-cls").addClass("menu-icon-img-class");
            $("#menu-close-icon").removeClass("menu-close-icon-active").addClass("menu-close-icon-disabled");
            $("#sub-menu-id").removeClass("sub-menu-active").addClass("sub-menu");
        }
    });

    // Close sub-menu when clicking on a link
    $(".sub-menu a").click(function() {
        menuOpen = false;
        $("#menu-icon-img").removeClass("menu-icon-img-cls").addClass("menu-icon-img-class");
        $("#menu-close-icon").removeClass("menu-close-icon-active").addClass("menu-close-icon-disabled");
        $("#sub-menu-id").removeClass("sub-menu-active").addClass("sub-menu");
    });

    // --- SCROLL REVEAL ANIMATION ---
    function revealOnScroll() {
        var windowHeight = $(window).height();
        var elementVisible = 100;

        $(".reveal").each(function() {
            var elementTop = $(this).offset().top -$(window).scrollTop();
            if (elementTop < windowHeight - elementVisible) {
                $(this).addClass("active");
            }
        });
    }

    $(window).on("scroll", revealOnScroll);
    revealOnScroll(); // Trigger initial check on load

    // --- 3D TILT EFFECT ON CARDS ---
    $(".tilt-card").on("mousemove", function(e) {
        var card = $(this);
        var cardOffset = card.offset();
        var cardWidth = card.outerWidth();
        var cardHeight = card.outerHeight();

        var mouseX = e.pageX - cardOffset.left;
        var mouseY = e.pageY - cardOffset.top;

        var rotateX = ((mouseY / cardHeight) - 0.5) * -20;
        var rotateY = ((mouseX / cardWidth) - 0.5) * 20;

        card.css("transform", `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    });

    $(".tilt-card").on("mouseleave", function() {
        $(this).css("transform", "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    });

    // --- ANIMATED CURSOR PARTICLES EFFECT ---
    const canvas = document.getElementById("cursor-canvas");
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    $(window).resize(resizeCanvas);

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60 + 260}, 100%, 70%)`; // Blue/Violet tint
            this.life = 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
            this.life -= 0.02;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = Math.max(0, this.life);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    $(window).on("mousemove touchmove", function(e) {
        let x = e.clientX || (e.originalEvent.touches && e.originalEvent.touches[0].clientX);
        let y = e.clientY || (e.originalEvent.touches && e.originalEvent.touches[0].clientY);
        if (x && y) {
            for (let i = 0; i < 3; i++) {
                particlesArray.push(new Particle(x, y));
            }
        }
    });

    function handleParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(handleParticles);
    }
    handleParticles();

});