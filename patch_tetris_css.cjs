const fs = require('fs');

const css = `
.tetris-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    touch-action: none;
    position: relative;
    z-index: 2;
}

#tetris {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(136, 14, 79, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
}

.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Inter', sans-serif;
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 12px 20px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.score-display {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
}

.score-display #score {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--accent);
    margin-left: 6px;
}

.restart-btn {
    background: linear-gradient(135deg, var(--accent) 0%, #a61246 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 12px rgba(216, 27, 96, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3);
}

.restart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(216, 27, 96, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3);
}

.restart-btn:active {
    transform: scale(0.95);
}

.game-over {
    display: none;
    text-align: center;
    background: rgba(255, 255, 255, 0.85);
    padding: 2.5rem 2rem;
    border-radius: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 20px 50px rgba(136, 14, 79, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1);
    width: 85%;
    max-width: 320px;
    z-index: 10;
    border: 1px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

.game-over.show {
    display: block;
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.game-over h3 {
    color: var(--accent);
    margin-bottom: 0.8rem;
    font-size: 1.8rem;
    font-family: 'Playfair Display', serif;
    font-style: italic;
}

@keyframes popIn {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
    50% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}
`;

fs.writeFileSync('pages/tetris.css', css);
