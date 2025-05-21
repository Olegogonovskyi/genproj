export const baseUrls = {
    baseAuth: '/auth',
    baseArticle: `/articles/`,
    baseAncestors: '/ancestors',
    baseChronology: '/chronology',
    baseChronologyAdmin: '/chronologyAdmin',
    baseUploadGed: '/uploadGed'

}

const baseUrl = 'http://localhost/api'
const authUrls = {
    register: baseUrls.baseAuth + '/register',
    login: baseUrls.baseAuth + '/login',
    refresh: baseUrls.baseAuth + '/refresh',
    logout: baseUrls.baseAuth + '/logout',
    googleLogin: baseUrls.baseAuth + '/google',
    googleCallback: baseUrls.baseAuth + '/google/callback',

}

const articleUrls = {
    getAllArticles: '/articles',
    createArticle: baseUrls.baseArticle + '/create',
    getArticleByID: (articleId: string) => baseUrls.baseArticle + articleId,
    searchArticle: (query: string) => baseUrls.baseArticle + query,

}

const ancestors = {
    allancestors: '/ancestors/allAncestors',
    allFamilies: baseUrls.baseAncestors + '/allFamilies',
    ancestorById: (ancestorId: string) => baseUrls.baseAncestors + `/${ancestorId}`,
}

const chronologyUrls = {
    getById: (chronoId: string) => baseUrls.baseChronology + `/${chronoId}`,
    createDate: baseUrls.baseChronologyAdmin + '/create',
    updateByID: (chronoId: string) => baseUrls.baseChronologyAdmin + `/${chronoId}`
}

const searchRes = {
    searchResAll: 'searchResAll'
}

const uploadGed ={
    uploadFile: baseUrls.baseUploadGed + '/upload'
}


export {
    baseUrl, authUrls, articleUrls, searchRes, ancestors, chronologyUrls, uploadGed
}
