const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Booking = require('./models/booking');
// Khởi tạo express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect('mongodb+srv://quangdeptraino1:4hbQKQwcBrgDBlZ2@cluster0.q951owo.mongodb.net/datxeonline', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Đã kết nối thành công đến MongoDB');
})
.catch((err) => {
  console.log('Lỗi kết nối MongoDB:', err);
});

// Định nghĩa schema cho yêu cầu hỗ trợ
const supportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

// Tạo model từ schema
const SupportRequest = mongoose.model('SupportRequest', supportSchema);

// Route chính
app.get('/', (req, res) => {
  res.send('Hello, Welcome to Support Server!');
});

// Route để gửi yêu cầu hỗ trợ
app.post('/support', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
  }

  try {
    // Tạo yêu cầu hỗ trợ mới và lưu vào MongoDB
    const newRequest = new SupportRequest({
      name,
      email,
      message
    });

    await newRequest.save();

    res.status(200).json({ message: 'Yêu cầu hỗ trợ đã được gửi thành công!' });
  } catch (error) {
    console.error('Lỗi khi lưu yêu cầu hỗ trợ:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi gửi yêu cầu hỗ trợ.' });
  }
});
app.post('/api/bookings', async (req, res) => {
    const { fullName, contactNumber, pickupLocation, dropoffLocation, bookingDate, bookingTime, carType, passengerCount, time } = req.body;

    try {
        const newBooking = new Booking({
            fullName,
            contactNumber,
            pickupLocation,
            dropoffLocation,
            bookingDate,
            bookingTime,
            carType,
            passengerCount,
            time
        });

        await newBooking.save();

        // Trả về phản hồi thành công
        res.status(200).json({ message: 'Booking saved successfully!' });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Error saving booking', error });
    }
});
// Lắng nghe server tại port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
