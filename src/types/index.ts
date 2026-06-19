export interface SanitySlug {
  current: string
}

export interface SanityImage {
  _key?: string
  asset: {
    _ref: string
    _type: string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Category {
  _id: string
  name: string
  slug: SanitySlug
  description?: string
  image?: SanityImage
  displayOrder?: number
}

export interface Product {
  _id: string
  name: string
  slug: SanitySlug
  price: number
  images: SanityImage[]
  shortDescription?: string
  fullDescription?: PortableTextBlock[]
  burnTime?: string
  fragranceNotes?: string
  material?: string
  weight?: string
  inStock: boolean
  featured?: boolean
  categoryName?: string
  categorySlug?: string
}

export interface PortableTextBlock {
  _key: string
  _type: string
  children: Array<{
    _key: string
    _type: string
    marks: string[]
    text: string
  }>
  markDefs: Array<{
    _key: string
    _type: string
    href?: string
  }>
  style: string
}
