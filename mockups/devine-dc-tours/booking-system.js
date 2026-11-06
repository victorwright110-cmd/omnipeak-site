/**
 * DIVINE DC TOURS - SHARED BOOKING, CAPACITY & QR VALIDATION SYSTEM
 * Shared across all website pages (localStorage synchronized)
 */

const MAX_CAPACITY = 14;

const PRICES = {
  'Daytime Washington D.C. Sightseeing Tour': 49,
  'Lincoln & National Monuments by Moonlight': 59,
  'Private Full-Vehicle Charter': 686
};

const DEFAULT_SLOTS = [
  { time: '10:00 AM', label: 'Morning Sightseeing ($49)', type: 'Daytime Washington D.C. Sightseeing Tour', price: 49 },
  { time: '1:00 PM', label: 'Afternoon Discovery ($49)', type: 'Daytime Washington D.C. Sightseeing Tour', price: 49 },
  { time: '4:00 PM', label: 'Late Afternoon Tour ($49)', type: 'Daytime Washington D.C. Sightseeing Tour', price: 49 },
  { time: '7:30 PM', label: 'Lincoln & Monuments by Moonlight ($59)', type: 'Lincoln & National Monuments by Moonlight', price: 59 }
];

// Helper: Format Date String YYYY-MM-DD
function getFormattedDate(offsetDays = 1) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// Initialize seed data if not present
function initializeSystemData() {
  const tomorrowStr = getFormattedDate(1);

  // 1. Capacity counts per slot
  if (!localStorage.getItem('divine_dc_bookings_v2')) {
    const initialCapacity = {
      [`${tomorrowStr}_10:00 AM`]: 8,   // 6 left
      [`${tomorrowStr}_1:00 PM`]: 12,   // 2 left
      [`${tomorrowStr}_4:00 PM`]: 6,    // 8 left
      [`${tomorrowStr}_7:30 PM`]: 10    // 4 left (Moonlight)
    };
    localStorage.setItem('divine_dc_bookings_v2', JSON.stringify(initialCapacity));
  }

  // 2. Reservation ticket records
  if (!localStorage.getItem('divine_dc_tickets_v2')) {
    const initialTickets = {
      'DDC-2026-7841': {
        ref: 'DDC-2026-7841',
        tour: 'Daytime Washington D.C. Sightseeing Tour',
        date: tomorrowStr,
        time: '10:00 AM',
        guests: 2,
        guestName: 'Eleanor Roosevelt',
        guestEmail: 'eleanor@example.com',
        guestPhone: '(202) 555-0144',
        total: '$98',
        pickup: 'National Mall Central Departure • Washington, D.C.',
        status: 'CONFIRMED',
        created: new Date().toISOString()
      },
      'DDC-2026-5519': {
        ref: 'DDC-2026-5519',
        tour: 'Lincoln & National Monuments by Moonlight',
        date: tomorrowStr,
        time: '7:30 PM',
        guests: 4,
        guestName: 'Marcus Vance',
        guestEmail: 'marcus.v@example.com',
        guestPhone: '(202) 555-0182',
        total: '$236',
        pickup: 'National Mall Central Departure • Washington, D.C.',
        status: 'CONFIRMED',
        created: new Date().toISOString()
      },
      'DDC-2026-9204': {
        ref: 'DDC-2026-9204',
        tour: 'Private Full-Vehicle Charter',
        date: tomorrowStr,
        time: '1:00 PM',
        guests: 14,
        guestName: 'Sarah Jenkins Group',
        guestEmail: 'sarah.j@example.com',
        guestPhone: '(202) 555-0199',
        total: '$686',
        pickup: '🏨 Hotel Pickup: The Hay-Adams (800 16th St NW, Washington, DC)',
        status: 'CHECKED_IN',
        checkedInAt: '09:42 AM by Guide Michael',
        created: new Date().toISOString()
      }
    };
    localStorage.setItem('divine_dc_tickets_v2', JSON.stringify(initialTickets));
  }
}

// Capacity Getter
function getStoredBookings() {
  initializeSystemData();
  try {
    return JSON.parse(localStorage.getItem('divine_dc_bookings_v2')) || {};
  } catch (e) {
    return {};
  }
}

// Tickets Getter
function getStoredReservations() {
  initializeSystemData();
  try {
    return JSON.parse(localStorage.getItem('divine_dc_tickets_v2')) || {};
  } catch (e) {
    return {};
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) {
    drawer.classList.toggle('hidden');
  }
}

// Auto-run on script load
initializeSystemData();
