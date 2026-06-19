import { groq } from 'next-sanity'

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(displayOrder asc) {
    _id,
    name,
    slug,
    description,
    image,
    displayOrder
  }
`

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image
  }
`

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $slug] | order(price asc) {
    _id,
    name,
    slug,
    price,
    images,
    shortDescription,
    inStock,
    "categoryName": category->name,
    "categorySlug": category->slug.current
  }
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    images,
    shortDescription,
    inStock,
    "categoryName": category->name,
    "categorySlug": category->slug.current
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    images,
    shortDescription,
    fullDescription,
    burnTime,
    fragranceNotes,
    material,
    weight,
    inStock,
    featured,
    "categoryName": category->name,
    "categorySlug": category->slug.current
  }
`

export const allProductSlugsQuery = groq`
  *[_type == "product"] { "slug": slug.current }
`

export const allCategorySlugsQuery = groq`
  *[_type == "category"] { "slug": slug.current }
`
