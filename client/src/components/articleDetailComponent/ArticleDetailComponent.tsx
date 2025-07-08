import React, {FC} from 'react';
import { IArticleResModel } from '../../models/IArticleResModel';
import style from './ArticleDetailComponent.module.css'
import { convertYoutubeUrlToEmbed } from '../../helpers/convertYoutubeUrlToEmbed';

const ArticleDetailComponent: FC<{article: IArticleResModel}> = ({article}) => {
  const { title, image, body} = article
  return (
    <div>
      <div className={style.mainImage}>
        {image && <img src={image[0]} alt={image[0]} />}
      </div>
      <div className={style.maincontent}>
        <div className={style.articleTitle}> {title}</div>
        <div className={style.bodyContent}>
          {body.map((articleBlock, index) => {
            switch (articleBlock.type) {
              case 'TEXT':
                return <p key={index}>{articleBlock.content}</p>;
              case 'IMAGE':
                return <img key={index} src={articleBlock.content} alt={articleBlock.alt? articleBlock.alt : articleBlock.content} />;
              case 'VIDEO':
                return <iframe key={index} src={articleBlock.content} allowFullScreen title={articleBlock.alt? articleBlock.alt : 'Відео' }></iframe>;
                case "QUOTE":
                    return <p key={index} className={style.quote}>{articleBlock.content} <span className={style.quoteAuthor}>{articleBlock.alt}</span></p>
                case 'AUDIO':
                return <audio key={index} src={articleBlock.content} controls ></audio>;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailComponent;