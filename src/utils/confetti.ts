import confetti from 'canvas-confetti';

// Red AI vs Blue AI signature palette for the Cyber Defense Counteroffensive
export const COUNTEROFFENSIVE_CONFETTI_COLORS = [
  '#E11D48', // Red AI primary
  '#FB7185', // Rose highlight
  '#1D4ED8', // Blue AI deep
  '#38BDF8', // Cyan / Sky blue
  '#4F46E5', // Indigo mediator
  '#10B981', // Emerald hardened
  '#F59E0B', // Amber alert
];

// Booking celebration palette (Gold, Sapphire, Emerald, Crimson)
export const BOOKING_CONFETTI_COLORS = [
  '#1D4ED8',
  '#0284C7',
  '#38BDF8',
  '#E11D48',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
];

/**
 * Celebratory dual-cannon confetti animation for Bookings & Orders
 */
export const triggerBookingConfetti = () => {
  try {
    // Center burst
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: BOOKING_CONFETTI_COLORS,
      disableForReducedMotion: true,
    });

    // Side cannons for celebratory fanfare
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.08, y: 0.65 },
        colors: BOOKING_CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.92, y: 0.65 },
        colors: BOOKING_CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
    }, 160);

    // Final sparkling micro-fountain
    setTimeout(() => {
      confetti({
        particleCount: 45,
        spread: 100,
        origin: { y: 0.5 },
        shapes: ['circle', 'square'],
        colors: ['#38BDF8', '#FB7185', '#F59E0B', '#10B981'],
        disableForReducedMotion: true,
      });
    }, 320);
  } catch (err) {
    // Graceful no-op if canvas is not supported in the environment
    console.debug('Confetti error:', err);
  }
};

/**
 * Signature Red AI vs. Blue AI confetti burst when taking or completing the AI Readiness Test
 */
export const triggerReadinessTestConfetti = () => {
  try {
    // Red AI vs Blue AI opposing side cannons
    confetti({
      particleCount: 65,
      angle: 55,
      spread: 65,
      origin: { x: 0.05, y: 0.7 },
      colors: ['#E11D48', '#FB7185', '#FDA4AF', '#BE123C'], // Red AI cannon
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 65,
      angle: 125,
      spread: 65,
      origin: { x: 0.95, y: 0.7 },
      colors: ['#1D4ED8', '#38BDF8', '#60A5FA', '#0284C7'], // Blue AI cannon
      disableForReducedMotion: true,
    });

    // Converging center fusion burst
    setTimeout(() => {
      confetti({
        particleCount: 95,
        spread: 85,
        origin: { y: 0.55 },
        colors: COUNTEROFFENSIVE_CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
    }, 200);
  } catch (err) {
    console.debug('Confetti error:', err);
  }
};
