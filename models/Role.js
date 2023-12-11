import mongoose from 'mongoose';

const RoleSсhema = new mongoose.Schema({
    value: { type: String, unique: true, default: 'USER' },
});

export default mongoose.model('Role', RoleSсhema);
