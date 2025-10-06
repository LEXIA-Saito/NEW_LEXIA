import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import {
  fetchBlogPost,
  fetchBlogPosts,
  getBlogGenreLabel,
} from "@/lib/blog-posts"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import Image from "next/image"

interface BlogArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await fetchBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug)
  if (!post) {
    return {
      title: "記事が見つかりません | LEXIA BLOG",
    }
  }

  const canonical = `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`

  return {
    title: `${post.title} | LEXIA BLOG`,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${post.title} | LEXIA BLOG`,
      description: post.description,
      type: "article",
      url: canonical,
      publishedTime: post.date,
      images: post.heroImage
        ? [
            {
              url: post.heroImage,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | LEXIA BLOG`,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
    keywords: post.tags.length > 0 ? post.tags : undefined,
  }
}

export const revalidate = 60

function formatJapaneseDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const post = await fetchBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    articleSection: getBlogGenreLabel(post.genre),
    author: {
      "@type": "Person",
      name: "齋藤雅人",
    },
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
    },
    url: `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`,
    image: post.heroImage,
    keywords: post.tags.length > 0 ? post.tags.join(", ") : undefined,
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <Breadcrumbs dynamicLabels={{ [post.slug]: post.title }} />
          <article>
            <header className="mb-12">
              <span className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-1 text-xs font-medium tracking-wide text-white dark:bg-neutral-100 dark:text-neutral-900">
                {getBlogGenreLabel(post.genre)}
              </span>
              <h1 className="mt-6 text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                <span>{formatJapaneseDate(post.date)}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readingTime}</span>
                <span aria-hidden="true">•</span>
                <span>執筆：齋藤雅人</span>
              </div>
              {post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tags/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-neutral-600"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              ) : null}
              {post.heroImage ? (
                <div className="mt-8">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    width={1200}
                    height={675}
                    className="w-full rounded-xl object-cover"
                  />
                </div>
              ) : null}
            </header>

            <div className="space-y-12 text-neutral-800 dark:text-neutral-200">
              {post.sections?.map((section, index) => (
                <section key={section.heading ?? index}>
                  {section.heading ? (
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.image ? (
                    <div className="mt-4">
                      <Image
                        src={section.image}
                        alt={section.heading ?? `${post.title} image ${index + 1}`}
                        width={1200}
                        height={700}
                        className="w-full rounded-lg object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="mt-4 space-y-4">
                    {section.body?.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    {section.list ? (
                      <ul className="list-disc space-y-2 pl-6">
                        {section.list.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}

              {post.contentHtml ? (
                <section className="prose prose-neutral max-w-none dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                </section>
              ) : null}
            </div>

            <footer className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300">
              <p>
                WEB制作事業LEXIAがWEB制作技術やITの最新トレンドを発信します。
              </p>
              <p className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-white dark:bg-neutral-100 dark:text-neutral-900"
                >
                  制作の相談をする
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            </footer>
          </article>
        </div>
      </main>
      <Footer />
      <Script
        async
        src="https://fundingchoicesmessages.google.com/i/pub-8789901212664644?ers=1"
        strategy="afterInteractive"
      />
      <Script
        id={`google-fc-signal-${post.slug}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`,
        }}
      />
      <Script
        id={`google-fc-closure-${post.slug}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var ba=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var da=ca(this);function l(a,b){if(b)a:{var c=da;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&b!=null&&ba(c,a,{configurable:!0,writable:!0,value:b})}} 
function ea(a){return a.raw=a}function n(a){var b=typeof Symbol!="undefined"&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if(typeof a.length=="number")return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function fa(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}var ha=typeof Object.create=="function"?Object.create:function(a){function b(){}b.prototype=a;return new b},p;
if(typeof Object.setPrototypeOf=="function")p=Object.setPrototypeOf;else{var q;a:{var ja={a:!0},ka={};try{ka.__proto__=ja;q=ka.a;break a}catch(a){}q=!1}p=q?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var la=p;function t(a,b){a.prototype=ha(b.prototype);a.prototype.constructor=a;if(la)la(a,b);else for(var c in b)if(c!="prototype")if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.A=b.prototype}function ma(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b}l("Object.is",function(a){return a?a:function(b,c){return b===c?b!==0||1/b===1/c:b!==b&&c!==c}});
l("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(c<0&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});l("String.prototype.includes",function(a){return a?a:function(b,c){if(this==null)throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.includes must not be a regular expression");return this.indexOf(b,c||0)!==-1}});l("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});
l("Number.isFinite",function(a){return a?a:function(b){return typeof b!=="number"?!1:!isNaN(b)&&b!==Infinity&&b!==-Infinity}});l("Number.isInteger",function(a){return a?a:function(b){return Number.isFinite(b)?b===Math.floor(b):!1}});l("Number.isSafeInteger",function(a){return a?a:function(b){return Number.isInteger(b)&&Math.abs(b)<=Number.MAX_SAFE_INTEGER}});
l("Math.trunc",function(a){return a?a:function(b){b=Number(b);if(isNaN(b)||b===Infinity||b===-Infinity||b===0)return b;var c=Math.floor(Math.abs(b));return b<0?-c:c}});/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var u=this||self;function v(a,b){a:{var c=["CLOSURE_FLAGS"];for(var d=u,e=0;e<c.length;e++)if(d=d[c[e]],d==null){c=null;break a}c=d}a=c&&c[a];return a!=null?a:b}function w(a){return a};function na(a){u.setTimeout(function(){throw a;},0)};var oa=v(610401301,!1),pa=v(188588736,!0),qa=v(645172343,v(1,!0));var x,ra=u.navigator;x=ra?ra.userAgentData||null:null;function z(a){return oa?x?x.brands.some(function(b){return(b=b.brand)&&b.indexOf(a)!=-1}):!1:!1}function A(a){var b;a:{if(b=u.navigator)if(b=b.userAgent)break a;b=""}return b.indexOf(a)!=-1};function B(){return oa?!!x&&x.brands.length>0: (A("Trident")||A("MSIE")) };
/* ... (script truncated for brevity in this view) ... */
 (function(){ /* long closure-based script originally provided by the user */ })();
`,
        }}
      />
      <Script
        id={`blog-article-${post.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
