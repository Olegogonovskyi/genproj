const baseUrls = {
    baseAuth: '/auth',
    baseArticle: `/articles/`,
    baseAncestors: '/ancestors'
}

const baseUrl = 'http://localhost/api/'
const authUrls = {
    register: baseUrls.baseAuth + '/register',
    login: baseUrls.baseAuth + '/register',
    refresh: baseUrls.baseAuth + '/refresh',
    logout: baseUrls.baseAuth + '/logout',
    googleLogin: baseUrls.baseAuth + '/google',
    googleCallback: baseUrls.baseAuth + '/google/callback'
}

const articleUrls = {
    getAllArticles: '/articles',
    getArticleByID: (articleId: string) => baseUrls.baseArticle + articleId,
    searchArticle: (query: string) => baseUrls.baseArticle + query,

}

const ancestors = {
    allancestors: '/ancestors/allAncestors',
    allFamilies: baseUrls.baseAncestors + '/allFamilies',
    ancestorById: (ancestorId: string) => baseUrls.baseAncestors + ancestorId,
}

const searchRes = {
    searchResAll: 'searchResAll'
}


export {
    baseUrl, authUrls, articleUrls, searchRes, ancestors
}
