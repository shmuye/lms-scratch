export const hash = async(DataTransfer, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedData = await bcrypt.hash(DataTransfer, salt);
    return hashedData;
}

export const compareHash = async(DataTransfer, hashedData) => {
    return await bcrypt.compare(DataTransfer, hashedData);
}