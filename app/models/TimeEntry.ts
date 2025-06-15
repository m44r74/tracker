import mongoose from 'mongoose';

const TimeEntrySchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  start: Date,
  end: Date,
});

export default mongoose.models.TimeEntry || mongoose.model('TimeEntry', TimeEntrySchema);
