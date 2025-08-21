// === Константи ===
const baseUrl = 'http://localhost/api';

const apiParams = {
    articleId: 'articleId',
    ancestorId: 'ancestorId',
    chronologyId: 'dateId',
    userID: 'userId',
    eventId: 'eventId',
    tagId: 'tagId'
}

const baseUrls = {
    openAi: 'openAi',
    auth: '/auth',
    article: '/articles/',
    tag: '/tag',
    ancestors: '/ancestors',
    chronology: '/chronology',
    chronologyAdmin: '/chronologyAdmin',
    uploadGed: 'uploadGed',
    users: '/users',
    adminUsers: 'admin/users',
    adminTags: 'admin/tags',
    errors: 'error',
    adminDashboard: 'adminDashboard',
    images: 'images',
};

// === усі URL ===
const apiUrls = {
    auth: {
        register: `${baseUrls.auth}/register`,
        login: `${baseUrls.auth}/login`,
        refresh: `${baseUrls.auth}/refresh`,
        logout: `${baseUrls.auth}/logout`,
        googleLogin: `${baseUrls.auth}/google`,
        googleCallback: `$http://localhost/auth/callback`,
    },
    article: {
        getAll: `${baseUrls.article}`,
        create: `${baseUrls.article}create`,
        getById: (id: string): string => `${baseUrls.article}/${id}`,
        update: `${baseUrls.article}/update`,
        search: (query: string): string => `${baseUrls.article}/${query}`,
    },
    tag: {
        getById: (id: string): string => `${baseUrls.tag}/${id}`,
        update:  `${baseUrls.adminTags}/update`,
    },
    ancestors: {
        getAllAncestors: `${baseUrls.ancestors}/allAncestors`,
        getAllFamilies: `${baseUrls.ancestors}/allFamilies`,
        getFamilyById: (id: string): string => `${baseUrls.ancestors}/families/${id}`,
        getAncestorById: (id: string): string => `${baseUrls.ancestors}/${id}`,
        getAncestorDateById: (id: string): string => `${baseUrls.ancestors}/event/${id}`,
        getAncestorDate:  `${baseUrls.ancestors}/event`,
        getAllAncestorsDates: `${baseUrls.ancestors}/allEvents`,
    },
    chronology: {
        getById: (id: string): string => `${baseUrls.chronology}/${id}`,
        create: `${baseUrls.chronologyAdmin}/create`,
        updateById: (id: string): string => `${baseUrls.chronologyAdmin}/${id}`,
    },
    users: {
        me: `${baseUrls.users}/me`,
        delete: `${baseUrls.users}/deleteMe`,
        create: `${baseUrls.adminUsers}/create`,
        update:  `${baseUrls.adminUsers}/update`,
        userById: (userId: string): string => `${baseUrls.adminUsers}/${userId}`,
    },
    uploadGed: {
        uploadGed: `${baseUrls.uploadGed}/upload`,
        deleteGed: `${baseUrls.uploadGed}/deleteAll`,
    },
    searchRes: {
        searchResAll: 'searchResAll',
    },
    errorsUrls: {
        ForbiddenException: `${baseUrls.errors}/ForbiddenException`
    },
    admin: {
        articles: `articles`,
        createArticle: `articles/create`,
        updateteArticle: `update`,
        chronology: `chronology`,
        createChronology: `chronology/create`,
        uploadGed: `uploadGed/upload`,
    },
    images: {
        getAllImages: 'getAllImages',
    }
};


// === Експорт ===
export { baseUrl, apiUrls, baseUrls, apiParams};

