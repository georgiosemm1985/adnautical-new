import { useQuery, useMutation, useQueryClient } from 'react-query';
import { blogPosts as initialBlogPosts } from '../mockData';
import { BlogPost } from '../types';

const getArticles = (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      resolve(JSON.parse(storedArticles));
    } else {
      localStorage.setItem('articles', JSON.stringify(initialBlogPosts));
      resolve(initialBlogPosts);
    }
  });
};

const updateArticle = (updatedArticle: BlogPost): Promise<BlogPost> => {
  return getArticles().then(articles => {
    const updatedArticles = articles.map(article => article.id === updatedArticle.id ? updatedArticle : article);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    return updatedArticle;
  });
};

const addArticle = (newArticle: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  return getArticles().then(articles => {
    const articleWithId = { ...newArticle, id: Math.max(0, ...articles.map(a => a.id)) + 1 };
    const updatedArticles = [...articles, articleWithId];
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    return articleWithId;
  });
};

const deleteArticle = (id: number): Promise<void> => {
  return getArticles().then(articles => {
    const updatedArticles = articles.filter(article => article.id !== id);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  });
};

export const useArticles = () => {
  return useQuery<BlogPost[], Error>('articles', getArticles);
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation(updateArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
    },
  });
};

export const useAddArticle = () => {
  const queryClient = useQueryClient();
  return useMutation(addArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
    },
  });
};