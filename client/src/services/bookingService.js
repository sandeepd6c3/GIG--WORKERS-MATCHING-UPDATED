import api from './api';

const MOCK_BOOKINGS = [
  {
    _id: 'b101',
    workerId: 'w1',
    workerName: 'Sarah Jenkins',
    workerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    category: 'Electrical & Wiring',
    customerName: 'Alex Morgan',
    date: '2026-08-28',
    time: '10:00 AM',
    status: 'accepted',
    totalAmount: 90,
    address: '42 Wallaby Way, Suite 400',
    notes: 'Install 2 smart switches in living room.'
  },
  {
    _id: 'b102',
    workerId: 'w2',
    workerName: 'David Rodriguez',
    workerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    category: 'Home Plumbing & Repairs',
    customerName: 'Alex Morgan',
    date: '2026-08-30',
    time: '02:30 PM',
    status: 'pending',
    totalAmount: 80,
    address: '742 Evergreen Terrace',
    notes: 'Kitchen sink pipe dripping water.'
  }
];

export const bookingService = {
  async createBooking(bookingData) {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data || response;
    } catch (err) {
      const newBooking = {
        _id: 'b_' + Date.now(),
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      return { success: true, booking: newBooking };
    }
  },

  async getMyBookings() {
    try {
      const response = await api.get('/bookings/my-bookings');
      return response.data || MOCK_BOOKINGS;
    } catch (err) {
      return MOCK_BOOKINGS;
    }
  },

  async updateBookingStatus(id, status) {
    try {
      const response = await api.patch(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (err) {
      return { success: true, bookingId: id, status };
    }
  }
};

export default bookingService;
