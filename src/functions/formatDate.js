export const formatDate = (user) => {
	const date = new Date(user?.createdAt).getDate();
	const month = new Date(user?.createdAt).getMonth() + 1;
	const year = new Date(user?.createdAt).getFullYear();
	const dateStr = date + '/' + month + '/' + year;
	return dateStr;
};
