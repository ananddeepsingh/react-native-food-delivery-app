import { sanityClient } from "./sanity"

const sanityQuery = (query, params) => sanityClient.fetch(query, params)

export async function getFeatured () {
  const featured = await sanityQuery('*[_type == "featured"]')
  return featured
}

export async function getCategories () {
  const featured = await sanityQuery('*[_type == "category"]')
  return featured
}

export async function getFeaturedRestaurants () {
  const featured = await sanityQuery(`*[_type=='featured'] {
    ...,
    restaurants[] -> {
      ...,
      dishes[] -> {
      ...
      },
      type-> {
        name
      }
    }
  }`)
  return featured
}