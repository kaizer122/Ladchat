"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getavataaars_1 = require("getavataaars");
const randomArrayElem_1 = __importDefault(require("./randomArrayElem"));
const getRandomAvatar = () => {
    const hair = randomArrayElem_1.default(Object.values(getavataaars_1.Hair));
    const avatarStyle = randomArrayElem_1.default(Object.values(getavataaars_1.AvatarStyle));
    const accessories = randomArrayElem_1.default(Object.values(getavataaars_1.Accessories));
    const facialHair = randomArrayElem_1.default(Object.values(getavataaars_1.FacialHair));
    const hairColour = randomArrayElem_1.default(Object.values(getavataaars_1.HairColour));
    const clothes = randomArrayElem_1.default(Object.values(getavataaars_1.Clothes));
    const fabricColour = randomArrayElem_1.default(Object.values(getavataaars_1.FabricColour));
    const graphicOnClothes = randomArrayElem_1.default(Object.values(getavataaars_1.GraphicOnClothes));
    const eyebrow = randomArrayElem_1.default(Object.values(getavataaars_1.Eyebrow));
    const eyes = randomArrayElem_1.default(Object.values(getavataaars_1.Eyes));
    const mouth = randomArrayElem_1.default(Object.values(getavataaars_1.Mouth));
    const skin = randomArrayElem_1.default(Object.values(getavataaars_1.Skin));
    const avatarObj = {
        Hair: hair,
        AvatarStyle: avatarStyle,
        Accessories: accessories,
        FacialHair: facialHair,
        HairColour: hairColour,
        Clothes: clothes,
        FabricColour: fabricColour,
        GraphicOnClothes: graphicOnClothes,
        Eyebrow: eyebrow,
        Eyes: eyes,
        Mouth: mouth,
        Skin: skin,
    };
    const avatarUrl = getavataaars_1.generateAvatar(avatarObj);
    return { avatarObj, avatarUrl };
};
exports.default = getRandomAvatar;
//# sourceMappingURL=getRandomAvatar.js.map