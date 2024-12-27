import React from 'react'
import GalleryProductSkeleton from './GalleryProductSkeleton'

export default function GalleryLoader() {
  return (
    <div className='grid gap-5 grid-cols-4  my-4'>
        <GalleryProductSkeleton />
        <GalleryProductSkeleton />
        <GalleryProductSkeleton />
        <GalleryProductSkeleton />
        <GalleryProductSkeleton />
        <GalleryProductSkeleton />
        <GalleryProductSkeleton />
        <GalleryProductSkeleton />
    </div>
  )
}
