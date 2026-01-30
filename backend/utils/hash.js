import bcrypt from "bcryptjs";

export const hash = async(DataTransfer, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(DataTransfer, salt);
    
}

export const compareHash = async(DataTransfer, hashedData) => {
    return await bcrypt.compare(DataTransfer, hashedData);
}