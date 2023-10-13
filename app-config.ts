export const _BASE_DIR_IMAGES: string = process.env.BASE_DIR_IMAGES || './images';

function logConfig(){
    console.log("_BASE_DIR_IMAGES set to " + _BASE_DIR_IMAGES);
};

logConfig();