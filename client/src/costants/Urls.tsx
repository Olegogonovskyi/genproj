

const baseUrl = 'http://localhost:3000/'
const authUrls = {
    register: '/auth/register',
    login: '/auth/register',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    googleLogin: '/auth/google',
    googleCallback: '/auth/google/callback'
}

const articleUrls = {
    getAllArticles: '/articles',
    getArticleByID: '/articles/{articleId}',
    searchArticle: (query: string) => '/articles?' + query,

}

const searchRes = {
    searchResAll: 'searchResAll'
}


export {
    baseUrl, authUrls, articleUrls, searchRes
}
