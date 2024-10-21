export const maxFont = (data) => {
    return data.length > 20 ? data.slice(0, 20) + '...' : data
};

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
}
