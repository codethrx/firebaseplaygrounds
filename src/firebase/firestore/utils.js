const formatDoc = (doc) => ({ id: doc.id, data: { ...doc.data() } });
export { formatDoc };
