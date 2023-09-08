import * as yup from 'yup' // importing functions from yup library

const createCategorySchema = yup.object().shape({
    title: yup.string()
            .required('Category title is required')
            .min(2, 'Category title must be at least 4 characters')
            .max(50, 'Category title must be less than 20 characters'),
         
    description:yup.string()
                .required('Description is required')
                .min(5, 'Description must be at least 4 characters')
                .max(200, 'Description must be less than 20 characters'), 
})

export {createCategorySchema}