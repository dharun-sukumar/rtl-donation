// RTL Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const html = document.documentElement;
    
    // Check for saved RTL preference
    const isRTL = localStorage.getItem('rtl-mode') === 'true';
    
    // Apply saved preference
    if (isRTL) {
        html.setAttribute('dir', 'rtl');
        rtlToggles.forEach(btn => updateToggleButton(btn, true));
    }
    
    // RTL toggle event listeners for all buttons
    rtlToggles.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentDir = html.getAttribute('dir');
            const isCurrentlyRTL = currentDir === 'rtl';
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            if (isCurrentlyRTL) {
                html.removeAttribute('dir');
                localStorage.setItem('rtl-mode', 'false');
                rtlToggles.forEach(b => updateToggleButton(b, false));
            } else {
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('rtl-mode', 'true');
                rtlToggles.forEach(b => updateToggleButton(b, true));
            }
        });
    });
    
    function updateToggleButton(btn, isRTL) {
        if (btn) {
            const icon = btn.querySelector('i');
            if (isRTL) {
                icon.className = 'fas fa-globe-americas';
                btn.title = 'Switch to Left-to-Right';
            } else {
                icon.className = 'fas fa-globe';
                btn.title = 'Switch to Right-to-Left';
            }
        }
    }
    
    // Apply RTL-specific adjustments
    function applyRTLStyles() {
        const style = document.createElement('style');
        style.textContent = `
            [dir="rtl"] .hero-content {
                text-align: right;
            }
            
            [dir="rtl"] .nav-logo {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .dropdown-content {
                right: 0;
                left: auto;
            }
            
            [dir="rtl"] .hero-buttons {
                justify-content: flex-end;
            }
            
            [dir="rtl"] .campaign-stats {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .story-location {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .card-link {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .card-link:hover {
                gap: 1rem;
            }
            
            [dir="rtl"] .contact-info p {
                text-align: right;
            }
            
            [dir="rtl"] .form-row {
                direction: rtl;
            }
            
            [dir="rtl"] .amount-input {
                direction: rtl;
            }
            
            [dir="rtl"] .currency-symbol {
                left: auto;
                right: 1rem;
            }
            
            [dir="rtl"] .amount-input input {
                padding: 1rem 2.5rem 1rem 1rem;
                text-align: right;
            }
            
            [dir="rtl"] .radio-option {
                flex-direction: row-reverse;
                text-align: right;
            }
            
            [dir="rtl"] .checkbox-option {
                flex-direction: row-reverse;
                text-align: right;
            }
            
            [dir="rtl"] .impact-item {
                flex-direction: row-reverse;
                text-align: right;
            }
            
            [dir="rtl"] .security-item {
                flex-direction: row-reverse;
                justify-content: flex-end;
            }
            
            [dir="rtl"] .way-card {
                text-align: right;
            }
            
            [dir="rtl"] .mission-card {
                text-align: right;
            }
            
            [dir="rtl"] .story-card {
                text-align: right;
            }
            
            [dir="rtl"] .campaign-card {
                text-align: right;
            }
            
            [dir="rtl"] .stat-item {
                text-align: right;
            }
            
            [dir="rtl"] .slide-content {
                text-align: right;
            }
            
            [dir="rtl"] .page-header {
                text-align: right;
            }
            
            [dir="rtl"] .section-header {
                text-align: right;
            }
            
            [dir="rtl"] .cta {
                text-align: right;
            }
            
            [dir="rtl"] .donation-cta {
                text-align: right;
            }
            
            [dir="rtl"] .counter-item {
                text-align: right;
            }
            
            [dir="rtl"] .donation-option {
                flex-direction: row-reverse;
                text-align: right;
            }
            
            [dir="rtl"] .hamburger {
                order: -1;
            }
            
            @media (max-width: 768px) {
                [dir="rtl"] .nav-menu {
                    text-align: right;
                    right: -100%;
                    left: auto;
                }
                
                [dir="rtl"] .nav-menu.active {
                    right: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Apply RTL styles on page load
    applyRTLStyles();
});