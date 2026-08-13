module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 2,
      url: ['http://localhost:4173/'],
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.95 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.95 }],
        'categories:seo': ['warn', { minScore: 0.95 }],
        'errors-in-console': ['warn', {}],
        'button-name': 'error',
        'link-name': 'error',
        'html-has-lang': 'error',
        'meta-viewport': 'error',
        'document-title': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};