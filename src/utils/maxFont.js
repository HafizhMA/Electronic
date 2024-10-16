export const maxFont = (data) => {
    return data.length > 20 ? data.slice(0, 20) + '...' : data
};
