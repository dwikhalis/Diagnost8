function formatAge(date) {
    return new Date().getFullYear() - new Date(date).getFullYear()
   }

const formatDate = (createdAt) => {
    return createdAt.toLocaleDateString('ID-id')
}

module.exports = {formatAge, formatDate}