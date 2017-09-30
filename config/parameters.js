'use strict';

module.exports = {
    models: {
        professionals: 'Professionals',
        professionalDetail: 'ProfessionalDetail',
        categories: 'Categories',
        subcategories: 'Subcategories',
        demands: 'Demands'
    },
    query: {
        num_elements: 10,
        min_distance: 0,
        max_distance: 1000000000,
        professional_fields: {
            user_name:1,
            corp_name:1,
            category:1,
            logo_url:1,
            rating:1,
            reviews_number:1,
            photo_number:1,
            distance:1
        }
    }
};