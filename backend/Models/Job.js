const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // Title is required
        trim: true,      // Remove whitespace
    },
    description: {
        type: String,
        required: true,  // Description is required
        trim: true,      // Remove whitespace
    },
    experienceLevel: {
        type: String,
        required: true,  // Experience level is required
        enum: ['Entry Level', 'Mid Level', 'Senior Level'], // Limit to specific values
    },
    endDate: {
        type: Date,
        required: true,  // End date is required
        validate: {
            validator: function (v) {
                return v > new Date(); // Validate that end date is in the future
            },
            message: props => `${props.value} is not a valid end date! End date must be in the future.`
        }
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // Company ID is required
        ref: 'Company'   // Reference to the Company model
    },
    candidates: {
        type: [String],  // Array of strings for candidate emails
        default: []      // Default to an empty array
    }
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
