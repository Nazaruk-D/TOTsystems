import searchReducer, { setSearchValue, InitialStateType } from '../searchSlice';

describe('search reducer', () => {
    const initialState: InitialStateType = {
        searchValue: '',
    };

    it('should handle setSearchValue', () => {
        const searchValue = 'example';
        const nextState = searchReducer(initialState, setSearchValue(searchValue));

        expect(nextState.searchValue).toBe(searchValue);
    });

    it('should return the initial state if no action is provided', () => {
        const nextState = searchReducer(undefined, {} as any);
        expect(nextState).toEqual(initialState);
    });
});
