import { Skeleton } from "@/components/ui/skeleton"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function ProjectLoading() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Skeleton className="h-6 w-32" />
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-5/6" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Main Image Gallery Skeleton */}
          <div className="mb-16">
            <Skeleton className="aspect-[16/9] rounded-lg mb-4" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-[16/9] rounded-lg" />
              ))}
            </div>
          </div>

          {/* Project Details Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-start">
                    <Skeleton className="h-5 w-5 mr-2 mt-0.5" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-5 w-5 mr-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Projects Skeleton */}
          <div>
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="aspect-[16/9]" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-32 mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
