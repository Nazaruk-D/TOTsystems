import userReducer, {
    setFolderName,
    setIsLoggedIn,
    setUserData,
    clearUserData,
    setUserFolders,
    InitialStateType,
} from '../userSlice';
import { FoldersEnum } from '../../../enums/foldersEnum';

describe('user reducer', () => {
    const initialState: InitialStateType = {
        userData: {
            id: null,
            name: '',
            email: '',
            avatar: '',
            folders: [],
        },
        isActiveFolder: FoldersEnum.Incoming,
        isLoggedIn: false,
    };

    it('should handle setFolderName', () => {
        const folderName = FoldersEnum.Outgoing;
        const nextState = userReducer(initialState, setFolderName(folderName));

        expect(nextState.isActiveFolder).toBe(folderName);
    });

    it('should handle setIsLoggedIn', () => {
        const isLoggedIn = true;
        const nextState = userReducer(initialState, setIsLoggedIn(isLoggedIn));

        expect(nextState.isLoggedIn).toBe(isLoggedIn);
    });

    it('should handle setUserData', () => {
        const userData = {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            avatar: 'avatar.png',
            folders: ['inbox'],
        };
        const nextState = userReducer(initialState, setUserData(userData));

        expect(nextState.userData).toEqual(userData);
    });

    it('should handle setUserFolders', () => {
        const folders = ['inbox', 'sent'];
        const nextState = userReducer(initialState, setUserFolders(folders));

        expect(nextState.userData.folders).toEqual(folders);
    });

    it('should handle clearUserData', () => {
        const nextState = userReducer(initialState, clearUserData());

        expect(nextState.userData).toEqual({
            id: null,
            name: '',
            email: '',
            avatar: '',
            folders: [],
        });
    });

    it('should return the initial state if no action is provided', () => {
        const nextState = userReducer(undefined, {} as any);
        expect(nextState).toEqual(initialState);
    });
});
