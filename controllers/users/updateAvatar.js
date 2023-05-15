const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const User = require('../../models/user');


const updateAvatar = async (req, res, next) => {
    try {        
        const { path: tmpUpload, originalname } = req.file;
        const { _id: id } = req.user;
        const imageName = `${id}_${originalname}`;
        const resultUpload = path.join(__dirname, '../../', 'public', 'avatars', imageName);
        const img = await Jimp.read(tmpUpload);
        await img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(tmpUpload);
        
        await fs.rename(tmpUpload, resultUpload);
        const avatarURL = path.join('public', 'avatars', imageName);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });

        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(tmpUpload);
        next(error);
    }
}


module.exports = updateAvatar;