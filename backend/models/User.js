const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Đảm bảo tên người dùng là duy nhất
    },
    email: {
        type: String,
        required: true,
        unique: true, // Đảm bảo email là duy nhất
    },
    password: {
        type: String,
        required: true, // Mật khẩu là bắt buộc
    },
});

// Xuất schema như một model để sử dụng trong các phần khác của ứng dụng
const User = mongoose.model('User', userSchema);

module.exports = User;