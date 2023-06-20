import appReducer, { setAppErrorAC, setAppInformMessage, InitialStateType } from '../appSlice';
import { FoldersEnum } from '../../../enums/foldersEnum';

describe('app reducer', () => {
    const initialState: InitialStateType = {
        error: null,
        informMessage: null,
        isActiveFolder: FoldersEnum.Incoming,
    };

    it('should handle setAppErrorAC', () => {
        const errorMessage = 'Something went wrong';
        const nextState = appReducer(initialState, setAppErrorAC(errorMessage));
        expect(nextState.error).toEqual(errorMessage);
    });

    it('should handle setAppInformMessage', () => {
        const message = 'Action completed successfully';
        const nextState = appReducer(initialState, setAppInformMessage(message));
        expect(nextState.informMessage).toEqual(message);
    });

    it('should return the initial state if no action is provided', () => {
        const nextState = appReducer(undefined, {} as any);
        expect(nextState).toEqual(initialState);
    });
});
