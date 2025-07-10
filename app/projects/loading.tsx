import { Skeleton } from "@/components/ui/skeleton"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function ProjectsLoading() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Skeleton className="h-6 w-32" />
          </div>

          <div className="text-center mb-16">
            <Skeleton className="h-8 w-32 mx-auto mb-4" />
            <Skeleton className="h-12 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>

          {/* Featured Projects Skeleton */}
          <div className="mb-20">
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-3 lg:grid lg:grid-cols-2 lg:gap-6">
                <Skeleton className="aspect-[16/9] lg:h-full rounded-lg" />
                <div className="p-6">
                  <Skeleton className="h-4 w-32 mb-3" />
                  <Skeleton className="h-8 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="aspect-[16/9] rounded-t-lg" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-32 mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filters Skeleton */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <Skeleton className="h-12 w-full md:w-96" />
              <div className="flex gap-3 w-full md:w-auto">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>

            {/* Category quick filters Skeleton */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* Projects Grid Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm">
                <Skeleton className="aspect-[16/9] rounded-t-lg" />
                <div className="p-6">
                  <Skeleton className="h-4 w-32 mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
