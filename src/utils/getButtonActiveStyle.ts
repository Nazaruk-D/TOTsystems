export const getButtonActiveStyle = (isActiveFolder: string, folderName: string) => {
    if (isActiveFolder === folderName) {
        return {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        };
    }
    return {};
};
