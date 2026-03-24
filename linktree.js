/**
 * XFOURTEEN LINKTREE - GOLDEN ROYAL EDITION
 * FULL JS - WITH BLUR LOADING SCREEN
 */

// ============================================
// PARTICLE SYSTEMS - ENHANCED VISIBILITY
// ============================================

class GoldDustSystem {
    constructor() {
        this.canvas = document.getElementById('goldDustCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 18000));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2.2 + 0.8,
                speedY: Math.random() * 0.6 + 0.2,
                opacity: Math.random() * 0.4 + 0.15,
                wiggle: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.y += p.speedY;
            p.wiggle += 0.02;
            const xOffset = Math.sin(p.wiggle) * 0.6;
            if (p.y > this.canvas.height) {
                p.y = 0;
                p.x = Math.random() * this.canvas.width;
            }
            this.ctx.beginPath();
            this.ctx.arc(p.x + xOffset, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, radius: 150 };
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 16000));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.6,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(212, 175, 55, ${Math.random() * 0.45 + 0.12})`,
                originalX: Math.random() * this.canvas.width,
                originalY: Math.random() * this.canvas.height,
                wiggle: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.wiggle += 0.015;
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouse.radius - dist) / this.mouse.radius;
                p.x -= Math.cos(angle) * force * 1.5;
                p.y -= Math.sin(angle) * force * 1.5;
            }
            p.x += (p.originalX - p.x) * 0.035;
            p.y += (p.originalY - p.y) * 0.035;
            p.x += p.speedX + Math.sin(p.wiggle) * 0.1;
            p.y += p.speedY + Math.cos(p.wiggle) * 0.1;
            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => { this.resize(); this.createParticles(); });
        window.addEventListener('mousemove', (e) => { this.mouse.x = e.x; this.mouse.y = e.y; });
    }
}

class MouseTrail {
    constructor() {
        this.canvas = document.getElementById('mouseTrailCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.trail = [];
        this.maxTrail = 12;
        this.init();
    }

    init() {
        this.resize();
        this.animate();
        this.bindEvents();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addPoint(x, y) {
        this.trail.push({ x, y, life: 1 });
        if (this.trail.length > this.maxTrail) this.trail.shift();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.trail.length; i++) {
            const p = this.trail[i];
            p.life -= 0.045;
            if (p.life <= 0) { this.trail.splice(i, 1); i--; continue; }
            const radius = 5 * p.life;
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
            gradient.addColorStop(0, `rgba(212, 175, 55, ${0.65 * p.life})`);
            gradient.addColorStop(0.6, `rgba(212, 175, 55, ${0.25 * p.life})`);
            gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        }
        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.addPoint(e.clientX, e.clientY));
    }
}

// ============================================
// CURSOR GLOW
// ============================================
class CursorGlow {
    constructor() {
        this.cursor = null;
        this.init();
    }

    init() {
        this.cursor = document.createElement('div');
        this.cursor.style.position = 'fixed';
        this.cursor.style.width = '28px';
        this.cursor.style.height = '28px';
        this.cursor.style.borderRadius = '50%';
        this.cursor.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0) 70%)';
        this.cursor.style.pointerEvents = 'none';
        this.cursor.style.zIndex = '9999';
        this.cursor.style.transform = 'translate(-50%, -50%)';
        this.cursor.style.transition = 'width 0.2s, height 0.2s';
        this.cursor.style.opacity = '0';
        document.body.appendChild(this.cursor);
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            this.cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
        
        document.querySelectorAll('a, .link-card, .social-icon').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.width = '45px';
                this.cursor.style.height = '45px';
                this.cursor.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.7) 0%, rgba(212, 175, 55, 0) 70%)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.width = '28px';
                this.cursor.style.height = '28px';
                this.cursor.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0) 70%)';
            });
        });
    }
}
// ============================================
// TOAST FUNCTION - FIXED & RAPI
// ============================================
function showToast(message, duration = 2800) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    
    if (!toast || !toastMsg) return;
    
    // Set message
    toastMsg.textContent = message;
    
    // Remove existing classes
    toast.classList.remove('show');
    
    // Force reflow to restart animation
    void toast.offsetWidth;
    
    // Add show class
    toast.classList.add('show');
    
    // Auto hide after duration
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Optional: Different toast types for different messages
function showSuccessToast(message) {
    const toast = document.getElementById('toast');
    const toastContent = toast?.querySelector('.toast-content');
    if (toastContent) {
        toastContent.style.background = 'linear-gradient(135deg, #22c55e, #16a34a, #22c55e)';
        setTimeout(() => {
            toastContent.style.background = 'linear-gradient(135deg, #ffdd77, #ffd966, #ffea8a)';
        }, 2800);
    }
    showToast(message);
}

function showErrorToast(message) {
    const toast = document.getElementById('toast');
    const toastContent = toast?.querySelector('.toast-content');
    if (toastContent) {
        toastContent.style.background = 'linear-gradient(135deg, #ef4444, #dc2626, #ef4444)';
        setTimeout(() => {
            toastContent.style.background = 'linear-gradient(135deg, #ffdd77, #ffd966, #ffea8a)';
        }, 2800);
    }
    showToast(message);
}

// ============================================
// DOM READY - WITH BLUR LOADING SCREEN
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    // Initialize All Effects
    new CursorGlow();
    new GoldDustSystem();
    new ParticleSystem();
    new MouseTrail();
    
    // Loader with Blur Effect - Enhanced
    const loader = document.getElementById('loader');
    const loadingBar = document.getElementById('loadingBar');
    
    if (loader && loadingBar) {
        // Add initial blur class if needed
        loader.style.backdropFilter = 'blur(12px)';
        loader.style.webkitBackdropFilter = 'blur(12px)';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 18;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Add loaded class for smooth exit with blur removal
                loader.classList.add('loaded');
                loader.style.backdropFilter = 'blur(0px)';
                loader.style.webkitBackdropFilter = 'blur(0px)';
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    showToast('Welcome to XFOURTEEN');
                }, 600);
            }
            loadingBar.style.width = `${Math.min(progress, 100)}%`;
        }, 50);
    }
    
    // Add ripple effect to link cards
    const addRippleEffect = (element) => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(212, 175, 55, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.4s ease';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '10';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.transform = 'scale(2)';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    };
    
    // Apply ripple effect to all link cards
    document.querySelectorAll('.link-card').forEach(card => {
        addRippleEffect(card);
    });
    
    // Preload images for smoother experience
    const preloadImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src && !img.complete) {
                img.loading = 'eager';
            }
        });
    };
    preloadImages();
    
    // Handle any links that might need confirmation
    document.querySelectorAll('.link-card').forEach(card => {
        const link = card.getAttribute('href');
        if (!link || link === '#' || link === '#!' || link === 'javascript:void(0)') {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                showToast('Coming soon!');
            });
        }
    });
});

// ============================================
// ADDITIONAL SMOOTH SCROLL & PERFORMANCE
// ============================================

// Debounce function for better scroll performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize with debounce
window.addEventListener('resize', debounce(() => {
    // Re-adjust any canvas elements if needed
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        if (canvas.width !== window.innerWidth) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}, 250));

// Prevent right-click context menu on images for cleaner look
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// Add keyboard shortcut (ESC to close any modals if added later)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals if present
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
    }
});