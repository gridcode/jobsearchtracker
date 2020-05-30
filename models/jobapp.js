import mongoose from 'mongoose'

const JobAppSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [40, 'Please use a shorter title']
  },
})

const JobApp = mongoose.models.JobApp || mongoose.model('JobApp', JobAppSchema);

module.exports = JobApp