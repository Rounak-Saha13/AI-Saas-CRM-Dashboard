import mongoose from 'mongoose';

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Lost", "Won"];
export const LEAD_PRIORITIES = ["Low", "Medium", "High"];

const leadSchema = new mongoose.Schema(
   {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
   },
   name: {
        type: String,
        required: [true, "Lead name is required"],
        trim: true},
    email: { 
        type: String,
        required: [true, "Lead email is required"],
        trim: true},
    phone: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
    },
    status: {
        type: String,
        enum: LEAD_STATUSES,
        default: "New",
        index: true,
    },
    priority: {
        type: String,
        enum: LEAD_PRIORITIES,
        default: "Medium",
    },
    source: {
        type: String,
        enum: ["Website", "Referral", "Cold Outreach", "Social", "Event", "Other"],
        default: "Other",
    },
    value: {
        type: Number,
        default: 0,
        min: 0
    },
    notes: {
        type: String,
        default: "",
    },
    tags: [{
        type: String,
        default:"",
    }],
    aiSummary: {type : String, default: ""},
    aiRiskSummary: {type : String, default: ""},
    aiRiskScore: {type : Number, default: 0},
    order: {type : Number, default: 0},
},
    { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);

