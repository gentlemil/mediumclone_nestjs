// {
//   "user":{
//     "email": "jake@jake.jake",
//     "bio": "I like to skateboard",
//     "image": "https://i.stack.imgur.com/xHWG8.jpg"
//   }
// }

import { UserType } from '@app/user/types/user.type';

export type ProfileType = UserType & { following: boolean };
