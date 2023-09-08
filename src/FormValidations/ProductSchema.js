import * as yup from 'yup' // importing functions from yup library

const createProductSchema = yup.object().shape({
    title: yup.string()
            .required('Product name is required')
            .min(4, 'Product name must be at least 4 characters')
            .max(50, 'Product name must be less than 20 characters'),
         
    slugTitle:yup.string()
                .required('slug is required'),
    miniDescription:yup.string(), 
    description:yup.string(),
    category:yup.string().required('Category is required'), 
    sellPrice:yup.number()
                .required('the selling price is required')
                .test(
                    'Is positive?', 
                    'The selling price must be positive', 
                    (value) => value >= 0
                ), 
    comparePrice:yup.number()
                    .required('the comparing price is required')
                    .test(
                        'Is positive?', 
                        'The comparing price must be positive !', 
                        (value) => value >= 0
                    ),
    costPrice:yup.number()
                    .required('The cost price is required')
                    .test(
                        'Is positive?', 
                        'The cost price must be positive !', 
                        (value) => value >= 0
                    ),
    variants:yup.array()
                .of(
                    yup.object().shape({
                        name: yup.string().required('the variant name is required'),
                        options: yup.array()
                                    .of(
                                        yup.object().shape({
                                            value: yup.string().required('the option value is required'),
                                            priceDef: yup.number().required('Please enter the price difference for every variant option'),
                                            available:yup.boolean().required('For every variant option set if the option available or not')
                                        })
                                    )
                    })
                ),
    subcategory:yup.string().required('Sub Category is required'),        
})

export {createProductSchema}