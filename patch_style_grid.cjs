const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Remove menu-list styles
css = css.replace(/\.menu-list \{[\s\S]*?\.logout-item \.menu-item-icon \{[\s\S]*?\}/, '');

const newGridCss = `
.menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
    margin-bottom: 2rem;
    perspective: 1000px; /* For 3D effects if needed */
}

.menu-card {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 24px 12px;
    cursor: pointer;
    box-shadow: 0 8px 32px rgba(136, 14, 79, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy animation */
}

/* Shine effect */
.menu-card::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
    transform: skewX(-25deg);
    transition: 0.5s;
    z-index: 1;
}

.menu-card:hover::before {
    left: 125%;
}

.menu-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 15px 35px rgba(216, 27, 96, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 0.75);
    border-color: #fff;
}

.menu-card:active {
    transform: translateY(2px) scale(0.95);
}

.menu-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 2;
}

.icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 15px rgba(136, 14, 79, 0.1);
    transition: all 0.4s ease;
}

.menu-card:hover .icon-wrapper {
    background: #fff;
    box-shadow: 0 8px 25px rgba(216, 27, 96, 0.25);
    transform: translateY(-4px);
}

.menu-card .icon {
    font-size: 28px;
    filter: drop-shadow(0 2px 4px rgba(136,14,79,0.1));
    transition: transform 0.4s ease;
}

.menu-card:hover .icon {
    transform: scale(1.15) rotate(5deg);
}

.menu-card-title {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.5px;
}

.logout-card {
    background: rgba(211, 47, 47, 0.05);
    border-color: rgba(211, 47, 47, 0.15);
}

.logout-card .icon-wrapper {
    background: rgba(211, 47, 47, 0.1);
    box-shadow: 0 4px 15px rgba(211, 47, 47, 0.1);
}

.logout-card:hover {
    background: rgba(211, 47, 47, 0.15);
    box-shadow: 0 15px 35px rgba(211, 47, 47, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    border-color: rgba(211, 47, 47, 0.3);
}

.logout-card:hover .icon-wrapper {
    background: #fff;
    box-shadow: 0 8px 25px rgba(211, 47, 47, 0.3);
}

.logout-card .menu-card-title {
    color: #c62828;
}

/* Background floating glow orbs */
.bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(60px);
    z-index: -1;
    animation: floatOrb 10s ease-in-out infinite alternate;
}

.orb-1 {
    width: 300px;
    height: 300px;
    background: rgba(216, 27, 96, 0.15);
    top: -50px;
    left: -100px;
}

.orb-2 {
    width: 250px;
    height: 250px;
    background: rgba(255, 140, 0, 0.1);
    bottom: -50px;
    right: -50px;
    animation-delay: -5s;
}

@keyframes floatOrb {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30px, 40px) scale(1.1); }
}
`;

css = css + '\n' + newGridCss;

fs.writeFileSync('style.css', css);
