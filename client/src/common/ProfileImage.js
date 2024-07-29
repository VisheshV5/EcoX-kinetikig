import userService from "../services/user.service";

export const fetchProfileImage = async id => {
  try {
    const imageUrl = await userService.getProfileImage(id);
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.log(error);
    return null;
  }
};
