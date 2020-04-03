
// UserParts on User 의 UserParts는 영향이 없고 User만 model명과 같아야한다.
export const USER_FRAGMENT = `
        id
        username
        avatar
`;

export const COMMENT_FRAGMENT = `
        id
        text
        user {
            ${USER_FRAGMENT}
        }
`;

export const FILE_FRAGMENT = `
        id
        url
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    to {
        ${USER_FRAGMENT}
    }
    from {
        ${USER_FRAGMENT}
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages{
            ${MESSAGE_FRAGMENT}
        }
    }
`;

// $fragment로 호출되는 fragment인데
// 아래의 컬럼들(id, username 등)이 정의되어 있지 않으면 반환받지 못한다.
// 여기서는 fgrgment를 쓰는 이유는 posts{}는 prisma가 가져오지 못하기 때문에 
// posts{}를 명시적으로 정의하기 위해서 사용 됐는데
// posts 때문에 쓰는건데 기존에 있던 User를 다시 정의해야한다는 단점이 있다.

// export const USER_FRAGMENT = `
//     fragment UserParts on User {
//         id
//         username
//         email
//         firstName
//         lastName
//         following {
//             caption
//         }
//     }
  
// `;