'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

const BlogPostForm = () => {
    const session = useSession();

    const id = session.data?.user.id;

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        thumbnail: '',
        tags: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: { target: { name: string; value: unknown } }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Blog title is required';
        } else if (formData.title.trim().length < 5) {
            newErrors.title = 'Title must be at least 5 characters long';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Blog content is required';
        } else if (formData.content.trim().length < 50) {
            newErrors.content = 'Content must be at least 50 characters long';
        }

        if (formData.thumbnail && !/^https?:\/\/.+/.test(formData.thumbnail)) {
            newErrors.thumbnail = 'Please enter a valid URL';
        }

        if (!formData.tags.trim()) {
            newErrors.tags = 'At least one tag is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        const tagsArray = formData.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        const submitData = {
            title: formData.title.trim(),
            content: formData.content.trim(),
            thumbnail: formData.thumbnail || null,
            tags: tagsArray,
            authorId: id,
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/post/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            }
        );
        const result = await res.json();
        if (result?.data?.id) {
            toast.success('Blog post created successfully!');
            setFormData({
                title: '',
                content: '',
                thumbnail: '',
                tags: '',
            });
        } else {
            toast.error('Failed to create blog post. Please try again.');
        }
    };

    const wordCount = formData.content
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
    const charCount = formData.content.length;

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-100/20 dark:border-indigo-500/20 overflow-hidden'>
                    <div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-10'>
                        <h2 className='text-4xl font-bold text-white mb-3'>
                            Create New Blog Post
                        </h2>
                        <p className='text-blue-100 text-lg'>
                            Share your thoughts and ideas with the world
                        </p>
                    </div>

                    <div className='p-8 sm:p-10 space-y-8'>
                        <div className='flex flex-col'>
                            <label
                                htmlFor='title'
                                className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                            >
                                <span className='text-indigo-600 dark:text-indigo-400'>
                                    ●
                                </span>
                                Blog Title
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-200 ${
                                    errors.title
                                        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-indigo-300'
                                }`}
                                placeholder='10 Tips for Writing Better Code...'
                            />
                            {errors.title && (
                                <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                    ⚠ {errors.title}
                                </span>
                            )}
                            {formData.title && !errors.title && (
                                <span className='text-gray-500 dark:text-gray-400 text-sm mt-2'>
                                    ✓ {formData.title.length} characters
                                </span>
                            )}
                        </div>

                        <div className='flex flex-col'>
                            <label
                                htmlFor='content'
                                className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                            >
                                <span className='text-indigo-600 dark:text-indigo-400'>
                                    ●
                                </span>
                                Blog Content
                                <span className='text-red-500'>*</span>
                            </label>
                            <textarea
                                id='content'
                                name='content'
                                value={formData.content}
                                onChange={handleChange}
                                rows={12}
                                className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-200 resize-none ${
                                    errors.content
                                        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-indigo-300'
                                }`}
                                placeholder='Write your blog content here. Share your insights, experiences, and knowledge...'
                            />
                            {errors.content && (
                                <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                    ⚠ {errors.content}
                                </span>
                            )}
                            <div className='flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400'>
                                <span>📝 {wordCount} words</span>
                                <span>•</span>
                                <span>{charCount} characters</span>
                                <span>•</span>
                                <span
                                    className={
                                        charCount >= 50
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-amber-600 dark:text-amber-400'
                                    }
                                >
                                    {charCount >= 50
                                        ? '✓ Minimum reached'
                                        : `${50 - charCount} more needed`}
                                </span>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label
                                htmlFor='tags'
                                className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                            >
                                <span className='text-purple-600 dark:text-purple-400'>
                                    ●
                                </span>
                                Tags
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                id='tags'
                                name='tags'
                                value={formData.tags}
                                onChange={handleChange}
                                className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-200 ${
                                    errors.tags
                                        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-purple-300'
                                }`}
                                placeholder='JavaScript, Web Development, Tutorial, React'
                            />
                            {errors.tags && (
                                <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                    ⚠ {errors.tags}
                                </span>
                            )}
                            <span className='text-gray-500 dark:text-gray-400 text-sm mt-2'>
                                💡 Enter tags separated by commas
                            </span>
                            {formData.tags && !errors.tags && (
                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {formData.tags
                                        .split(',')
                                        .map((tag, index) => {
                                            const trimmedTag = tag.trim();
                                            return trimmedTag ? (
                                                <span
                                                    key={index}
                                                    className='px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium'
                                                >
                                                    #{trimmedTag}
                                                </span>
                                            ) : null;
                                        })}
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col'>
                            <label
                                htmlFor='thumbnail'
                                className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                            >
                                <span className='text-gray-400'>○</span>
                                Thumbnail Image URL
                                <span className='text-gray-500 dark:text-gray-400 text-xs font-normal'>
                                    (optional)
                                </span>
                            </label>
                            <input
                                type='url'
                                id='thumbnail'
                                name='thumbnail'
                                value={formData.thumbnail}
                                onChange={handleChange}
                                className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-200 ${
                                    errors.thumbnail
                                        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-indigo-300'
                                }`}
                                placeholder='https://example.com/thumbnail.jpg'
                            />
                            {errors.thumbnail && (
                                <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                    ⚠ {errors.thumbnail}
                                </span>
                            )}
                            {formData.thumbnail && !errors.thumbnail && (
                                <div className='mt-4 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-slate-600'>
                                    <Image
                                        src={formData.thumbnail}
                                        alt='Thumbnail preview'
                                        className='w-full h-48 object-cover'
                                        width={800}
                                        height={192}
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700/50 dark:to-indigo-900/30 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/50'>
                            <h3 className='font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'>
                                <span className='text-xl'>📊</span>
                                Post Summary
                            </h3>
                            <div className='grid grid-cols-2 gap-4 text-sm'>
                                <div>
                                    <span className='text-gray-600 dark:text-gray-400'>
                                        Title Length:
                                    </span>
                                    <span className='ml-2 font-semibold text-gray-800 dark:text-white'>
                                        {formData.title.length} chars
                                    </span>
                                </div>
                                <div>
                                    <span className='text-gray-600 dark:text-gray-400'>
                                        Word Count:
                                    </span>
                                    <span className='ml-2 font-semibold text-gray-800 dark:text-white'>
                                        {wordCount} words
                                    </span>
                                </div>
                                <div>
                                    <span className='text-gray-600 dark:text-gray-400'>
                                        Tags:
                                    </span>
                                    <span className='ml-2 font-semibold text-gray-800 dark:text-white'>
                                        {
                                            formData.tags
                                                .split(',')
                                                .filter((t) => t.trim()).length
                                        }
                                    </span>
                                </div>
                                <div>
                                    <span className='text-gray-600 dark:text-gray-400'>
                                        Thumbnail:
                                    </span>
                                    <span className='ml-2 font-semibold text-gray-800 dark:text-white'>
                                        {formData.thumbnail
                                            ? '✓ Added'
                                            : '○ None'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='pt-6'>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className='w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500/50 transition-all duration-200 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            >
                                {isSubmitting
                                    ? '✨ Publishing Post...'
                                    : '📝 Publish Blog Post'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostForm;
