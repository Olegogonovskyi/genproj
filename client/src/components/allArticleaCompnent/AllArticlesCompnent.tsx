import React, {FC} from 'react';
import { useAppSelector } from '../../redux/store';
import AricleComponent from '../aricleComponent/AricleComponent';

const AllArticlesCompnent: FC = () => {
  const {data} = useAppSelector(state => state.articlesReducer)
  return (
    <div>
      <h1>AllArticlesCompnent</h1>
      {
        data && data.map(article => <AricleComponent key={article.id} article={article}/>)
      }
      <h1>AllArticlesCompnent end</h1>
    </div>
  );
};

export default AllArticlesCompnent;
//
// import React, { FC, useEffect, useState } from 'react';
// import AricleComponent from '../aricleComponent/AricleComponent';
// import { articlesApiService } from '../../services/articles.api.service';
//
// // Інтерфейс для статті (адаптуй до структури бекенду)
// interface Article {
//   id: string;
//   title: string;
//
//   // Додай інші поля, які повертає бекенд
// }
//
// // Інтерфейс для відповіді API
// interface ApiResponse {
//   data: Article[];
//   total: number;
// }
//
// const AllArticlesCompnent: FC = () => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//
//   // Завантаження однієї сторінки (10 статей)
//   const loadArticles = async () => {
//     setLoading(true);
//     setError(null);
//
//     try {
//       console.log('Fetching articles: page=1, limit=10'); // Дебаг
//       const response = await articlesApiService.searchArticles({
//         page: 1,
//         qwerty: {
//           search: '', // Без пошуку
//           tag: '', // Без тегів
//           offset: 0, // Початок
//           limit: 10 // 10 статей
//         }
//       });
//       console.log('Response:', response); // Дебаг
//       setArticles(response.data);
//     } catch (err: any) {
//       console.error('Error loading articles:', err); // Дебаг
//       setError(err.message || 'Failed to load articles');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   // Виклик завантаження при монтажі компоненти
//   useEffect(() => {
//     loadArticles();
//   }, []);
//
//   return (
//     <div>
//       {loading && <p>Loading articles...</p>}
//       {error && <p>Error: {error}</p>}
//       {!loading && !error && articles.length === 0 && <p>No articles found</p>}
//       {!loading && !error && articles.length > 0 && (
//         articles.map(value => (
//           <h1 key={value.id}>{value.id} - {value.title}</h1>
//           // Альтернатива: <AricleComponent key={value.id} article={value} />
//         ))
//       )}
//     </div>
//   );
// };
//
// export default AllArticlesCompnent;