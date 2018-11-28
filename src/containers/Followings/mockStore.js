export const followerStore = {
  loading: false,
  success: false,
  followUser: {
    followings: [{
      id: 1,
      username: 'johndoe',
      email: 'jd@something.com',
      Profile: {
        firstName: 'John',
        lastName: 'Doe',
        profileImage: 'https://res.cloudinary.com/sammykeyz/image/upload/v1542924983/phlox/1542924981230_me.jpg',
        gender: 'male',
        contact: 'Test street',
        bio: 'Lowkey bad guy'
      }
    }],
    followers: [{
      id: 1,
      username: 'johndoe',
      email: 'jd@something.com',
      Profile: {
        firstNa: 'John',
        lastName: 'Doe',
        profileImage: 'https://res.cloudinary.com/sammykeyz/image/upload/v1542924983/phlox/1542924981230_me.jpg',
        gender: 'male',
        contact: 'Test street',
        bio: 'Lowkey bad guy'
      }
    }],
  }
};
