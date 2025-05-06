// Animation de fond élégante avec particules
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Couleur des particules (rouge bordeaux transparent)
    const particleColor = 'rgba(143, 0, 0, 0.15)';
    
    // Création des particules
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
    
    // Animation des particules
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Dessiner la particule
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
            
            // Mouvement
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Rebond sur les bords
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Dessiner des lignes entre les particules proches
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(143, 0, 0, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Redimensionnement
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Effet de saisie élégant pour les inputs
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 10px 25px rgba(143, 0, 0, 0.15)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });
});