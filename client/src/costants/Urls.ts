// === Константи ===
const baseUrl = 'http://localhost/api';

const apiParams = {
    articleId: 'articleId',
    ancestorId: 'ancestorId',
    chronologyId: 'dateId',
    userID: 'userId',
    eventId: 'eventId'
}

const baseUrls = {
    auth: '/auth',
    article: '/articles/',
    ancestors: '/ancestors',
    chronology: '/chronology',
    chronologyAdmin: '/chronologyAdmin',
    uploadGed: '/uploadGed',
    users: '/users',
    adminUsers: '/admin/users',
    errors: 'error'
};

// === усі URL ===
const apiUrls = {
    auth: {
        register: `${baseUrls.auth}/register`,
        login: `${baseUrls.auth}/login`,
        refresh: `${baseUrls.auth}/refresh`,
        logout: `${baseUrls.auth}/logout`,
        googleLogin: `${baseUrls.auth}/google`,
        googleCallback: `${baseUrls.auth}/google/callback`,
    },
    article: {
        getAll: `${baseUrls.article}`,
        create: `${baseUrls.article}create`,
        getById: (id: string): string => `${baseUrls.article}/${id}`,
        update: `${baseUrls.article}/update`,
        search: (query: string): string => `${baseUrls.article}/${query}`,
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
        upload: `${baseUrls.uploadGed}/upload`,
    },
    searchRes: {
        searchResAll: 'searchResAll',
    },
    errorsUrls: {
        ForbiddenException: `${baseUrls.errors}/ForbiddenException`
    }
};


// === Експорт ===
export { baseUrl, apiUrls, baseUrls, apiParams};

