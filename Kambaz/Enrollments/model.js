import mongoose from "mongoose";
import enrollmentSchema from "./schema.js";

const EnrollmentModel = mongoose.model("EnrollmentModel", enrollmentSchema);

export default EnrollmentModel;

