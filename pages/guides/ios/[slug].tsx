import hydrate from 'next-mdx-remote/hydrate';
import MDXComponents from '@/components/MDXComponents';
import React from 'react';
import { getFiles, getFileBySlug } from '@/lib/mdx';

export default function Blog({ mdxSource, frontMatter }) {
    const content = hydrate(mdxSource, {
        components: MDXComponents
    });
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
}

export async function getStaticPaths() {
    const posts = await getFiles('ios');

    return {
        paths: posts.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, '')
            }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    // params: { slug: 'blog-slug' }
    const post = await getFileBySlug('ios', params.slug);
    return { props: post };
}
