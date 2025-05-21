// === Константи ===
const baseUrl = 'http://localhost/api';

const apiParams = {
    articleId: 'articleId',
    ancestorId: 'ancestorId',
    chronologyId: 'dateId'
}

const baseUrls = {
    auth: '/auth',
    article: '/articles/',
    ancestors: '/ancestors',
    chronology: '/chronology',
    chronologyAdmin: '/chronologyAdmin',
    uploadGed: '/uploadGed',
};

// === Основний об’єкт з усіма URL ===
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
        getById: (id: string): string => `${baseUrls.article}${id}`,
        search: (query: string): string => `${baseUrls.article}${query}`,
    },
    ancestors: {
        getAllAncestors: `${baseUrls.ancestors}/allAncestors`,
        getAllFamilies: `${baseUrls.ancestors}/allFamilies`,
        getFamilyById: (id: string): string => `${baseUrls.ancestors}/families/${id}`,
        getAncestorById: (id: string): string => `${baseUrls.ancestors}/${id}`,
    },
    chronology: {
        getById: (id: string): string => `${baseUrls.chronology}/${id}`,
        create: `${baseUrls.chronologyAdmin}/create`,
        updateById: (id: string): string => `${baseUrls.chronologyAdmin}/${id}`,
    },
    uploadGed: {
        upload: `${baseUrls.uploadGed}/upload`,
    },
    searchRes: {
        searchResAll: 'searchResAll',
    },
};

// === Експорт ===
export { baseUrl, apiUrls, baseUrls, apiParams};

