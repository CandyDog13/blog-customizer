import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import { useState, CSSProperties } from 'react';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setSettings={setSettings} />
			<Article />
		</main>
	);
};
