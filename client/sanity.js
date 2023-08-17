import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: '84err0c1',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-08-14',
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source);

export const getImageUrl = (source) => {
  return builder
    .image(source)
    // .auto('format')
    // .fit('max')
    .url()
}