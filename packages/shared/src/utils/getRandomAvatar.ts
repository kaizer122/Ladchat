import {
  Accessories,
  AvatarStyle,
  Clothes,
  Eyebrow,
  Eyes,
  FabricColour,
  FacialHair,
  generateAvatar,
  GetAvataaarsSettings,
  GraphicOnClothes,
  Hair,
  HairColour,
  Mouth,
  Skin,
} from "getavataaars";
import getRandomArrayElem from "./randomArrayElem";

const getRandomAvatar = () => {
  const hair = getRandomArrayElem<Hair>(Object.values(Hair));
  const avatarStyle = getRandomArrayElem<AvatarStyle>(
    Object.values(AvatarStyle)
  );
  const accessories = getRandomArrayElem<Accessories>(
    Object.values(Accessories)
  );
  const facialHair = getRandomArrayElem<FacialHair>(Object.values(FacialHair));
  const hairColour = getRandomArrayElem<HairColour>(Object.values(HairColour));
  const clothes = getRandomArrayElem<Clothes>(Object.values(Clothes));
  const fabricColour = getRandomArrayElem<FabricColour>(
    Object.values(FabricColour)
  );
  const graphicOnClothes = getRandomArrayElem<GraphicOnClothes>(
    Object.values(GraphicOnClothes)
  );
  const eyebrow = getRandomArrayElem<Eyebrow>(Object.values(Eyebrow));
  const eyes = getRandomArrayElem<Eyes>(Object.values(Eyes));
  const mouth = getRandomArrayElem<Mouth>(Object.values(Mouth));
  const skin = getRandomArrayElem<Skin>(Object.values(Skin));

  const avatarUrl = generateAvatar({
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
  } as GetAvataaarsSettings);

  const avatarObj = {
    avatarStyle: avatarStyle,
    topType: hair,
    accessoriesType: accessories,
    hairColor: hairColour,
    facialHairType: facialHair,
    facialHairColor: hairColour,
    clotheType: clothes,
    clotheColor: fabricColour,
    graphicType: graphicOnClothes,
    eyeType: eyes,
    eyebrowType: eyebrow,
    mouthType: mouth,
    skinColor: skin,
  };
  return { avatarObj, avatarUrl };
};

export default getRandomAvatar;
