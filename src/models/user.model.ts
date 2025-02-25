import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    // profilePicture: string | null;
    isActive: boolean;
    lastLogin: Date | null;
    skillsAssessment: {
        questionId: mongoose.Types.ObjectId;
        answer: string;
    }[];
    selectedSkills: string[];
    pickedSkill?: string;
    careerAssessment: {
        questionId: mongoose.Types.ObjectId;
        answer: string;
    }[];
    learningPath: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(value: string): Promise<boolean>;
    omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // profilePicture: {
        //     type: String,
        //     default: null,
        // },
        isActive: {
            type: Boolean,
            default: false,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        skillsAssessment: [
            {
                questionId: {
                    type: Schema.Types.ObjectId,
                    ref: "Question",
                },
                answer: {
                    type: String,
                },
            },
        ],
        selectedSkills: [
            {
                type: String,
            },
        ],
        pickedSkill: {
            type: String,
            default: null,
        },
        careerAssessment: [
            {
                questionId: {
                    type: Schema.Types.ObjectId,
                    ref: "Question",
                },
                answer: {
                    type: String,
                },
            },
        ],
        learningPath: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        if (this.password) {
            this.password = await hashValue(this.password);
        }
    }
    next();
});

userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.methods.comparePassword = async function (value: string) {
    return compareValue(value, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;