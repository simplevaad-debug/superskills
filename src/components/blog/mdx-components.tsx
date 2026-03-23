import type { MDXComponents } from "mdx/types";

export const blogMdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-white mt-10 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-white mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-[#e4e4e7] mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-[#a1a1aa] leading-relaxed mb-4">{children}</p>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-[#D97757] hover:underline">
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-[#a1a1aa] mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-[#a1a1aa] mb-4 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-s-4 border-[#D97757] ps-4 my-4 text-[#71717a] italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-[#1e1e20] text-[#D97757] px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-[#141415] border border-[#27272a] rounded-lg p-4 overflow-x-auto mb-4 text-sm">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-[#27272a] my-8" />,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} className="rounded-lg my-6 max-w-full" />
  ),
};
